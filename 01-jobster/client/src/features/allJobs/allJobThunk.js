import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'

export const getAllJobsThunk = async (_, thunkAPI) => {
    const { page, search, status, jobType, sort } = thunkAPI.getState().allJobs

    let url = `/jobs?status=${status}&jobType=${jobType}&sort=${sort}&page=${page}`
    if (search) {
        url += `&search=${search}`
    }

    try {
        const resp = await customFetch.get(url)
        return resp.data
    } catch (err) {
        checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const showStatsThunk = async (_, thunkAPI) => {
    try {
        const resp = await customFetch.get('/jobs/stats')

        return resp.data
    } catch (err) {
        checkForUnauthorizedResponse(err, thunkAPI)
    }
}
