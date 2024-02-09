import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { removeUserFromStorage } from '../utils/localStorage'
import { logoutUser } from '../services/api/auth'

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        try {
            setLoading(true)
            await logoutUser()
            toast.success('Logging out')
            setTimeout(() => {
                removeUserFromStorage()
                setAuthUser(null)
            }, 2000)
        } catch (err) {
            toast.error(err)
        } finally {
            setLoading(false)
        }
    }
    return { loading, logout }
}

export default useLogout
