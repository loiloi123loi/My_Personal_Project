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

export const editChatnameThunk = async (url, { name, id }, thunkAPI) => {
    try {
        const resp = await customFetch.patch(`${url}/${id}`, { name })
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const deleteChatThunk = async (url, chatId, thunkAPI) => {
    try {
        const resp = await customFetch.delete(`${url}/${chatId}`)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}
