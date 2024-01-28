import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'

const customFetch = wrapper(
    axios.create({
        baseURL: 'http://localhost:5000/api/v1/',
        withCredentials: true,
    })
)

customFetch.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = `multipart/form-data`
    }
    return config
})

export const checkForUnauthorizedResponse = (err, thunkAPI) => {
    if (err.response.status === 401) {
        // thunkAPI.dispatch(clearStore())
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
}

export default customFetch
