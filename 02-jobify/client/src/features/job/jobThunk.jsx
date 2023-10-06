import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import {
    getAllJobs,
    handleChange,
    showLoading,
    hideLoading,
} from '../allJobs/allJobSlice'
import { clearValues, showLoadingEdit, hideLoadingEdit } from './jobSlice'

export const addJobThunk = async (url, job, callback, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, job)
        thunkAPI.dispatch(callback)
        thunkAPI.dispatch(clearValues())
        return resp.data.msg
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const getSingleJobThunk = async (jobId, thunkAPI) => {
    try {
        const resp = await customFetch.get(`/jobs/${jobId}`)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const editJobThunk = async ({ jobId, job, callback }, thunkAPI) => {
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job)
        thunkAPI.dispatch(clearValues())
        thunkAPI.dispatch(callback)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading())
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`)
        thunkAPI.dispatch(handleChange({ name: 'page', value: 1 }))
        thunkAPI.dispatch(getAllJobs())
        return resp.data.msg
    } catch (error) {
        thunkAPI.dispatch(hideLoading())
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}
