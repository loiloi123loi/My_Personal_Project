import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const user = 1
    if (!user) {
        return <Navigate to="/landing" />
    }
    return children
}

export default ProtectedRoute
