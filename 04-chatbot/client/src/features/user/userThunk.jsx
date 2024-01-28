import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'

export const registerUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg)
    }
}

export const verifyEmailThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg)
    }
}

export const loginLocalThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg)
    }
}

export const getCurrentUserThunk = async (url, thunkAPI) => {
    try {
        const resp = await customFetch.get(url)
        return resp.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg)
    }
}

export const forgotPasswordThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg)
    }
}

export const resetPasswordThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg)
    }
}
