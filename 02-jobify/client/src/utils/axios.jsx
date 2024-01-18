import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'
import { clearStore } from '../features/user/userSlice'

import { wrapper } from 'axios-cookiejar-support'

const customFetch = wrapper(
    axios.create({
        baseURL: 'https://jobify-api-29p7.onrender.com/',
        // baseURL: 'http://localhost:5000/api/v1/',
        withCredentials: true,
    })
)

customFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage()
    if (user) {
        // config.headers['Authorization'] = `Bearer ${user.token}`
    }
    config.headers['Content-Type'] = `multipart/form-data`
    return config
})

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
    if (error.response.status === 401) {
        thunkAPI.dispatch(clearStore())
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
}

export default customFetch
