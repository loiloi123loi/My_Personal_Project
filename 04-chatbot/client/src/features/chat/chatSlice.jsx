import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { createNewChatThunk, getAllChatThunk } from './chatThunk'

const initialState = {
    isLoading: false,
    items: [],
}
export const getAllChat = createAsyncThunk(
    'chat/getAllChat',
    async (_, thunkAPI) => {
        return getAllChatThunk('/chat', thunkAPI)
    }
)
export const createNewChat = createAsyncThunk(
    'chat/createNewChat',
    async (_, thunkAPI) => {
        return createNewChatThunk('/chat/create-new-chat', thunkAPI)
    }
)
const ChatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        return builder
            .addCase(getAllChat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllChat.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.items = payload.msg.data
            })
            .addCase(getAllChat.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
            .addCase(createNewChat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewChat.fulfilled, (state, { payload }) => {
                state.isLoading = false
                const item = {
                    chatname: payload.msg.chatname,
                    id: payload.msg.id,
                }
                state.items = [...state.items, item]
            })
            .addCase(createNewChat.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
    },
})

export default ChatSlice.reducer
