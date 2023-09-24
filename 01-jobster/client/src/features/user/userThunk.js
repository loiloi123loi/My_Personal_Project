import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user);
        return resp.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
};

export const clearStoreThunk = async (message, thunkAPI) => {
    try {
        thunkAPI.dispatch(logoutUser(message));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject();
    }
};
