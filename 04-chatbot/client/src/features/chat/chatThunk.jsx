import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'

export const getAllChatThunk = async (url, thunkAPI) => {
    try {
        const resp = await customFetch.get(url)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const createNewChatThunk = async (url, thunkAPI) => {
    try {
        const resp = await customFetch.post(url)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}
