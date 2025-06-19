import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_API_VERSION,
  withCredentials: true
})

// Attach Content-Type + credentials
customFetch.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  config.withCredentials = true
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

customFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refreshToken')

      if (!refreshToken) {
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            return customFetch(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      isRefreshing = true

      try {
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_API_VERSION + '/users/refresh-token',
          { refreshToken },
          { withCredentials: true }
        )

        const newAccessToken = response.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        customFetch.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        processQueue(null, newAccessToken)

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return customFetch(originalRequest)
      } catch (err) {
        processQueue(err, null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        const navigate = useNavigate()
        navigate('/login')
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default customFetch
