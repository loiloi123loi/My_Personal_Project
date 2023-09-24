import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobSlice'
import { clearValues } from './jobSlice'

export const createJobThunk = async (job, thunkAPI) => {
    try {
        const resp = await customFetch.post('/jobs', job)
        thunkAPI.dispatch(clearValues())
        return resp.data.msg
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading())
    try {
        const resp = await customFetch.delete('/jobs/' + jobId)
        thunkAPI.dispatch(getAllJobs())
        return resp.data.msg
    } catch (err) {
        thunkAPI.dispatch(hideLoading())
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
    try {
        const resp = await customFetch.patch('/jobs/' + jobId, job)
        thunkAPI.dispatch(clearValues())
        return resp.data.msg
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}
