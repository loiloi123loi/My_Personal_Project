import { AuthContext } from '@/contexts/AuthContext'
import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

interface IProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { isAuthenticated, isAuthLoading } = useContext(AuthContext)

  if (isAuthLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
