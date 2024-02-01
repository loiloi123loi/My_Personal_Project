import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'

export const getAllHistoryThunk = async (url, chatId, thunkAPI) => {
    try {
        const resp = await customFetch.get(`${url}?id=${chatId}`)
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}

export const askThunk = async (url, { chatId, content }, thunkAPI) => {
    try {
        const resp = await customFetch.post(`${url}?id=${chatId}`, { content })
        return resp.data
    } catch (err) {
        return checkForUnauthorizedResponse(err, thunkAPI)
    }
}
