import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedAdminRou = ({ children }) => {
    const { user } = useSelector((store) => store.user)

    if (user && user.role === 'admin') {
        return children
    }

    return <Navigate to="/dashboard/" />
}

export default ProtectedAdminRou
