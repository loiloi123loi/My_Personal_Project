import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import { registerUser } from '../services/api/auth'
import { saveUserToLocalStorage } from '../utils/localStorage'

const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    const register = async ({
        fullName,
        username,
        password,
        confirmPassword,
        gender,
    }) => {
        const success = handleInputErrors({
            fullName,
            username,
            password,
            confirmPassword,
            gender,
        })
        if (!success) return

        setLoading(true)
        try {
            const tokenUser = await registerUser({
                fullName,
                username,
                password,
                confirmPassword,
                gender,
            })
            saveUserToLocalStorage(tokenUser.user)
            toast.success('Register successfully')
            setTimeout(() => {
                setAuthUser(tokenUser.user)
            }, 2000)
        } catch (err) {
            toast.error(err)
        } finally {
            setLoading(false)
        }
    }
    return { loading, register }
}

export default useRegister

function handleInputErrors({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
}) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true
}
