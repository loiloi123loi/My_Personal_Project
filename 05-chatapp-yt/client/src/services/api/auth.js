import customFetch from '../../utils/axios'

export const registerUser = async (data) => {
    try {
        const resp = await customFetch.post('/auth/register', data)
        return resp.data
    } catch (err) {
        throw err.response.data.msg
    }
}

export const loginUser = async (data) => {
    try {
        const resp = await customFetch.post('/auth/login', data)
        return resp.data
    } catch (err) {
        throw err.response.data.msg
    }
}

export const logoutUser = async () => {
    try {
        const resp = await customFetch.delete('/auth/logout')
        return resp.data
    } catch (err) {
        throw err.response.data.msg
    }
}
