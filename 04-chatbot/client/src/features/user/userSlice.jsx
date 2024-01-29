import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
    forgotPasswordThunk,
    getCurrentUserThunk,
    loginLocalThunk,
    registerUserThunk,
    resetPasswordThunk,
    updateProfileThunk,
    verifyEmailThunk,
} from './userThunk'

const initialState = {
    isLoading: false,
    user: null,
    isSubmit: '',
    isLogin: null,
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        return registerUserThunk('/auth/local-register', user, thunkAPI)
    }
)

export const verifyEmailUser = createAsyncThunk(
    'user/verifyEmailUser',
    async (user, thunkAPI) => {
        return verifyEmailThunk('/auth/verify-email', user, thunkAPI)
    }
)

export const loginLocalUser = createAsyncThunk(
    'user/loginLocalUser',
    async (user, thunkAPI) => {
        return loginLocalThunk('/auth/local-login', user, thunkAPI)
    }
)

export const getCurrentUser = createAsyncThunk(
    'user/currentUser',
    async (_, thunkAPI) => {
        return getCurrentUserThunk('/user/my-profile', thunkAPI)
    }
)

export const forgotPasswordUser = createAsyncThunk(
    'user/forgotPassword',
    async (user, thunkAPI) => {
        return forgotPasswordThunk('/auth/forgot-password', user, thunkAPI)
    }
)

export const resetPasswordUser = createAsyncThunk(
    'user/resetPassword',
    async (user, thunkAPI) => {
        return resetPasswordThunk('/auth/reset-password', user, thunkAPI)
    }
)

export const updateProfileUser = createAsyncThunk(
    'user/updateProfile',
    async (user, thunkAPI) => {
        return updateProfileThunk('/user/update-profile', user, thunkAPI)
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetIsSubmit: (state) => {
            state.isSubmit = ''
        },
        logoutUser: (state, { payload }) => {
            state.user = null
            if (payload) {
                toast.success(payload)
            }
        },
    },
    extraReducers: (builder) => {
        return builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                toast.success(payload.msg)
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
            .addCase(verifyEmailUser.pending, (state) => {
                state.isLoading = true
                state.isSubmit = 'pending'
            })
            .addCase(verifyEmailUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSubmit = 'fulfilled'
                toast.success(payload.msg)
            })
            .addCase(verifyEmailUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSubmit = 'rejected'
                toast.error(payload)
            })
            .addCase(loginLocalUser.pending, (state) => {
                state.isLoading = true
                state.isSubmit = ''
            })
            .addCase(loginLocalUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.user = payload.user
                toast.success('Login successfull')
            })
            .addCase(loginLocalUser.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.user = payload.user
                state.isLogin = true
            })
            .addCase(getCurrentUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.user = null
                state.isLogin = false
                toast.error(payload)
            })
            .addCase(forgotPasswordUser.pending, (state) => {
                state.isLoading = true
                state.isSubmit = 'pending'
            })
            .addCase(forgotPasswordUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSubmit = 'fulfilled'
            })
            .addCase(forgotPasswordUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSubmit = 'rejected'
            })
            .addCase(resetPasswordUser.pending, (state) => {
                state.isLoading = true
                state.isSubmit = 'pending'
            })
            .addCase(resetPasswordUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSubmit = 'fulfilled'
                toast.success(payload.msg)
            })
            .addCase(resetPasswordUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSubmit = 'rejected'
                toast.error(payload)
            })
            .addCase(updateProfileUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfileUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.user = payload.user
                toast.success(payload.msg)
            })
            .addCase(updateProfileUser.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
    },
})

export const { logoutUser, resetIsSubmit } = userSlice.actions

export default userSlice.reducer
