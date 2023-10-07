import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { clearAllJobsState } from '../allJobs/allJobSlice'
import { clearValues } from '../job/jobSlice'
import { logoutUser } from './userSlice'

export const registerUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg)
    }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg)
    }
}

export const currentUserThunk = async (url, thunkAPI) => {
    try {
        const resp = await customFetch.get(url)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const clearStoreThunk = async (url, thunkAPI) => {
    try {
        const resp = await customFetch.delete(url)
    } catch (err) {}
    try {
        thunkAPI.dispatch(logoutUser('Logging out...'))
        thunkAPI.dispatch(clearAllJobsState())
        thunkAPI.dispatch(clearValues())
        return Promise.resolve()
    } catch (err) {
        return Promise.reject()
    }
}

export const getInfoAdminThunk = async (_, thunkAPI) => {
    try {
        const resp = await customFetch.get('/admin/')
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}
