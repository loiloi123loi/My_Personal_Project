import { AuthContext } from '@/contexts/AuthContext'
import { ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return <div>{children}</div>
}

export default ProtectedRoute
