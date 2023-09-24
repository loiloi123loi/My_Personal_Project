import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserFromStorage } from '../../utils/localStorage'
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk'
import { toast } from 'react-toastify'
import { FaSleigh } from 'react-icons/fa'

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
}

export const createJob = createAsyncThunk('/job/createJob', createJobThunk)
export const deleteJob = createAsyncThunk('/job/deleteJob', deleteJobThunk)
export const editJob = createAsyncThunk('/job/editJob', editJobThunk)

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
                jobLocation: getUserFromStorage()?.location || '',
            }
        },
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload }
        },
    },
    extraReducers: {
        [createJob.pending]: (state) => {
            state.isLoading = true
        },
        [createJob.fulfilled]: (state) => {
            state.isLoading = false
            toast.success('job created')
        },
        [createJob.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
        [deleteJob.fulfilled]: (state, { payload }) => {
            toast.success(payload)
        },
        [deleteJob.rejected]: (state, { payload }) => {
            toast.error(payload)
        },
        [editJob.pending]: (state) => {
            state.isLoading = true
        },
        [editJob.fulfilled]: (state) => {
            state.isLoading = false
            toast.success('job edit success')
        },
        [editJob.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
    },
})

export const { clearValues, handleChange, setEditJob } = jobSlice.actions

export default jobSlice.reducer
