import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser } from '../features/user/userSlice'

const ProtectedRoute = ({ children }) => {
    const { user, isLogin } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && isLogin === true) {
            dispatch(getCurrentUser())
        }
    }, [dispatch, user])

    useEffect(() => {
        if (isLogin !== true) {
            navigate('/landing')
        }
    }, [dispatch, isLogin])

    return children
}

export default ProtectedRoute
