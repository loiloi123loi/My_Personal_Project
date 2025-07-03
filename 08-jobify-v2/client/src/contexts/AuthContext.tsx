import { getUserInfo } from '@/api/auth'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  isAuthLoading: boolean
  loadAuth: () => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isAuthLoading: true,
  loadAuth: async () => {},
  logout: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const loadAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('accessToken')
    const storedUser = localStorage.getItem('user')
    setIsAuthLoading(true)

    try {
      if (storedToken) {
        try {
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
          } else {
            // Nếu không có user data, fetch từ server
            const data = await getUserInfo()
            const userData = data.result.user
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
          }
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Error loading auth:', error)
          // Nếu có lỗi, clear everything
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
          setUser(null)
          setIsAuthenticated(false)
          throw error
        }
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } finally {
      setIsAuthLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
    navigate('/login')
  }, [navigate])

  useEffect(() => {
    loadAuth().catch((error) => {
      console.error('Failed to load auth:', error)
    })
  }, [loadAuth])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isAuthLoading,
        loadAuth,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
