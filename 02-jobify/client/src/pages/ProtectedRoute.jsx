import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from '../features/user/userSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user, isLogin } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && isLogin !== false) {
            dispatch(currentUser())
        }
    }, [dispatch, user])

    useEffect(() => {
        if (isLogin === false) {
            navigate('/')
        }
    }, [dispatch, isLogin])

    return children
}

export default ProtectedRoute
