import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    clearStoreThunk,
    currentUserThunk,
    getInfoAdminThunk,
    loginUserThunk,
    registerUserThunk,
    updateUserThunk,
} from './userThunk'
import { toast } from 'react-toastify'

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: null,
    isLogin: null,
    data: {},
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        return registerUserThunk('/auth/local/register', user, thunkAPI)
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        return loginUserThunk('/auth/local/login', user, thunkAPI)
    }
)

export const currentUser = createAsyncThunk(
    'user/currentUser',
    async (_, thunkAPI) => {
        return currentUserThunk('/auth/current-user', thunkAPI)
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkAPI) => {
        return updateUserThunk('/auth/update-user', user, thunkAPI)
    }
)

export const clearStore = createAsyncThunk(
    'user/clearStore',
    async (_, thunkAPI) => {
        return clearStoreThunk('/auth/logout', thunkAPI)
    }
)

export const getInfoAdmin = createAsyncThunk('admin/getInfo', getInfoAdminThunk)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser: (state, { payload }) => {
            state.isLogin = false
            state.user = null
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
            state.isLoading = false
            toast.success(payload.msg)
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.error(payload)
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isLogin = true
            toast.success('Login successfull')
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.isLogin = null
            toast.error(payload)
        },
        [currentUser.pending]: (state) => {
            state.isLoading = true
        },
        [currentUser.fulfilled]: (state, { payload }) => {
            if (payload) {
                const { user } = payload
                state.user = user
                state.isLogin = true
            } else {
                state.user = null
                state.isLogin = false
            }
            state.isLoading = false
        },
        [currentUser.rejected]: (state) => {
            state.isLoading = false
            state.user = null
            state.isLogin = false
            toast.error('Get user info faild')
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.user = null
            toast.success(payload.msg)
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.user = null
            toast.error(payload)
        },
        [clearStore.pending]: (state) => {
            state.isLoading = true
        },
        [clearStore.fulfilled]: (state, { payload }) => {
            state.isLoading = false
        },
        [clearStore.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.success(payload)
        },
        [getInfoAdmin.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.data = payload
        },
        [getInfoAdmin.rejected]: (state, { payload }) => {
            state.isLoading = false
            toast.success(payload)
        },
    },
})

export default userSlice.reducer

export const { toggleSidebar, logoutUser } = userSlice.actions
