import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllJobsThunk, showStatsThunk } from './allJobThunk'
import { toast } from 'react-toastify'

const initialFiltersState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'newest',
    sortOptions: ['newest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
    isLoading: true,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk(
    'allJobs/getAllJobs',
    getAllJobsThunk
)

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk)

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true
        },
        hideLoading: (state) => {
            state.isLoading = false
        },
        handleChange: (state, { payload: { name, value } }) => {
            console.log(name, value)
            state.page = 1
            state[name] = value
        },
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState }
        },
        changePage: (state, { payload }) => {
            state.page = payload
        },
        clearAllJobsState: (state) => initialState,
    },
    extraReducers: {
        [getAllJobs.pending]: (state) => {
            state.isLoading = true
        },
        [getAllJobs.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.jobs = payload.jobs
            state.numOfPages = payload.numOfPages
            state.totalJobs = payload.totalJobs
        },
        [getAllJobs.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
        [showStats.pending]: (state) => {
            state.isLoading = true
        },
        [showStats.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.stats = payload.defaultStats
            state.monthlyApplications = payload.monthlyApplications
        },
        [showStats.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
    },
})

export default allJobsSlice.reducer

export const {
    showLoading,
    hideLoading,
    handleChange,
    clearFilters,
    changePage,
    clearAllJobsState,
} = allJobsSlice.actions
