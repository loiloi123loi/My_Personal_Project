import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
    addUserToStorage,
    getUserFromStorage,
    removeUserFromStorage,
} from '../../utils/localStorage'
import {
    loginUserThunk,
    registerUserThunk,
    clearStoreThunk,
    updateUserThunk,
} from './userThunk'

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromStorage(),
}

export const registerUser = createAsyncThunk(
    '/user/register',
    async (user, thunkAPI) => {
        return registerUserThunk('/auth/register', user, thunkAPI)
    }
)

export const loginUser = createAsyncThunk(
    '/user/login',
    async (user, thunkAPI) => {
        return loginUserThunk('/auth/login', user, thunkAPI)
    }
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (user, thunkAPI) => {
        return updateUserThunk('/auth/updateUser', user, thunkAPI)
    }
)

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk)

// Slice

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser: (state, { payload }) => {
            state.user = null
            state.isSidebarOpen = false
            removeUserFromStorage()
            if (payload) {
                toast.success(payload)
            }
        },
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            console.log(user)
            addUserToStorage(user)
            toast.success(`hello there, ${user.name}`)
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            addUserToStorage(user)
            toast.success(`welcom back, ${user.name}`)
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            addUserToStorage(user)
            toast.success(`User Updated!`)
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
    },
})

export default userSlice.reducer

export const { toggleSidebar, logoutUser } = userSlice.actions
