import axios from 'axios';
import { getUserFromStorage } from './localStorage';
import { clearStore } from '../features/user/userSlice';

const customFetch = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
});

customFetch.interceptors.request.use((config) => {
    const user = getUserFromStorage();
    if (user) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
});

export default customFetch;

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
    if (error.response.status === 401) {
        thunkAPI.dispatch(clearStore());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
};
