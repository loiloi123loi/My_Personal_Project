import axios from 'axios'

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_API_VERSION,
  withCredentials: true
})

customFetch.interceptors.request.use((config) => {
  config.headers['Content-Type'] = `multipart/form-data`
  return config
})

customFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, logging out...')
    }
    return Promise.reject(error)
  }
)

export default customFetch
