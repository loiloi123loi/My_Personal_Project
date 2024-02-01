import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { clearChat } from '../chat/chatSlice'
import { clearHistory } from '../history/historySlice'
import { clearUser } from './userSlice'

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
        return checkForUnauthorizedResponse(err, thunkAPI)
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

export const updateProfileThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const logoutUserThunk = async (url, thunkAPI) => {
    try {
        const resp = await customFetch.delete(url)
        thunkAPI.dispatch(clearUser('Logging out...'))
        thunkAPI.dispatch(clearHistory())
        thunkAPI.dispatch(clearChat())
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}
