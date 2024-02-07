import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

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
        // gọi axios
    }
    return <div></div>
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
