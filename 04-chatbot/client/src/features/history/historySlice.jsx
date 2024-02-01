import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { askThunk, getAllHistoryThunk } from './historyThunk'
import { toast } from 'react-toastify'

const initialState = {
    isLoading: false,
    histories: [],
}
export const getAllHistory = createAsyncThunk(
    'history/getAllHistory',
    async (chatId, thunkAPI) => {
        return getAllHistoryThunk('/history', chatId, thunkAPI)
    }
)
export const newAsk = createAsyncThunk(
    'history/sendNewAsk',
    async (data, thunkAPI) => {
        return askThunk('/history', data, thunkAPI)
    }
)
const HistorySlice = createSlice({
    name: 'History',
    initialState,
    reducers: {
        addAskUser: (state, { payload }) => {
            state.histories = [...state.histories, payload]
        },
        clearHistory: (state) => {
            state.histories = []
        },
    },
    extraReducers: (builder) => {
        return builder
            .addCase(getAllHistory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllHistory.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.histories = payload.msg.data
            })
            .addCase(getAllHistory.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
            .addCase(newAsk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(newAsk.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.histories = [...state.histories, payload.msg]
            })
            .addCase(newAsk.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
    },
})

export const { addAskUser, clearHistory } = HistorySlice.actions

export default HistorySlice.reducer
