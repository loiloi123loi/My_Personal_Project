import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
    createNewChatThunk,
    deleteChatThunk,
    editChatnameThunk,
    getAllChatThunk,
} from './chatThunk'

const initialState = {
    isLoading: false,
    items: [],
    idChatSelected: '',
    isEdit: false,
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
export const editChatname = createAsyncThunk(
    'chat/editChatname',
    async (chat, thunkAPI) => {
        return editChatnameThunk('/chat', chat, thunkAPI)
    }
)
export const deleteChat = createAsyncThunk(
    'chat/deleteChat',
    async (chatId, thunkAPI) => {
        return deleteChatThunk('/chat', chatId, thunkAPI)
    }
)
const ChatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        handleEdit: (state) => {
            state.isEdit = true
        },
        setIdChatSelected: (state, { payload }) => {
            if (state.idChatSelected !== payload) {
                state.idChatSelected = payload
            }
        },
        clearChat: (state) => {
            state.items = []
            state.idChatSelected = ''
        },
    },
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
                state.items = Array(...state.items, item)
            })
            .addCase(createNewChat.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
            .addCase(editChatname.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editChatname.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isEdit = false
                state.items = state.items.map((item) => {
                    if (item.id === payload.msg.id) {
                        item.chatname = payload.msg.chatname
                    }
                    return item
                })
            })
            .addCase(editChatname.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isEdit = false
                toast.error(payload)
            })
            .addCase(deleteChat.pending, (state) => {
                state.isLoading = true
                state.isEdit = false
            })
            .addCase(deleteChat.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isEdit = false
                state.items = state.items.filter((item) => {
                    if (String(item.id) !== state.idChatSelected) {
                        return item
                    }
                })
                state.idChatSelected = ''
                toast.success(payload.msg)
            })
            .addCase(deleteChat.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isEdit = false
                toast.error(payload)
            })
    },
})

export const { setIdChatSelected, handleEdit, clearChat } = ChatSlice.actions

export default ChatSlice.reducer
