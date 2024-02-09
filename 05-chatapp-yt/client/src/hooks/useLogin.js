import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import { useState } from 'react'
import { saveUserToLocalStorage } from '../utils/localStorage'
import { loginUser } from '../services/api/auth'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    const login = async ({ username, password }) => {
        const success = handleInputErrors(username, password)
        if (!success) return
        setLoading(true)
        try {
            const tokenUser = await loginUser({
                username,
                password,
            })
            saveUserToLocalStorage(tokenUser.user)
            toast.success('Login successfully')
            setTimeout(() => {
                setAuthUser(tokenUser.user)
            }, 2000)
        } catch (err) {
            toast.error(err)
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

export default useLogin

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error('Please fill in all fields')
        return false
    }
    return true
}
