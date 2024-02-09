import axios from 'axios'

const customFetch = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
})

customFetch.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json'
    return config
})

export default customFetch
