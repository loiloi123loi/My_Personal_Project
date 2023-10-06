import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addJobThunk, editJobThunk, getSingleJobThunk } from './jobThunk'
import { toast } from 'react-toastify'
import { deleteJobThunk } from '../job/jobThunk'

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobStatusOptions: ['pending', 'interview', 'declined'],
    status: 'pending',
    jobTypeOptions: ['full-time', 'part-time', 'internship'],
    jobType: 'full-time',
}

export const addJob = createAsyncThunk(
    'job/addJob',
    async ({ job, callback }, thunkAPI) => {
        return addJobThunk('/jobs/', job, callback, thunkAPI)
    }
)

export const getSingleJob = createAsyncThunk(
    'job/getSingleJob',
    async (jobId, thunkAPI) => {
        return getSingleJobThunk(jobId, thunkAPI)
    }
)

export const editJob = createAsyncThunk('job/editJob', editJobThunk)

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk)

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value
        },
        clearValues: () => {
            return {
                ...initialState,
            }
        },
        showLoadingEdit: (state) => {
            state.isLoading = true
        },
        hideLoadingEdit: (state) => {
            state.isLoading = false
        },
    },
    extraReducers: {
        [addJob.pending]: (state) => {
            state.isLoading = true
        },
        [addJob.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            toast.success(payload)
        },
        [addJob.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
        [getSingleJob.fulfilled]: (state, { payload }) => {
            state.position = payload.job.position
            state.company = payload.job.position
            state.jobLocation = payload.job.jobLocation
            state.status = payload.job.status
            state.jobType = payload.job.jobType
            state.isLoading = false
            toast.success(payload)
        },
        [getSingleJob.rejected]: (state, { payload }) => {
            toast.error(payload)
        },
        [editJob.pending]: (state) => {
            state.isLoading = true
        },
        [editJob.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            toast.success('Edit job successfully')
        },
        [editJob.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.success(payload)
        },
        [deleteJob.fulfilled]: (state, { payload }) => {
            toast.success(payload)
        },
        [deleteJob.rejected]: (state, { payload }) => {
            toast.error(payload)
        },
    },
})

export default jobSlice.reducer

export const { handleChange, clearValues, showLoadingEdit, hideLoadingEdit } =
    jobSlice.actions
