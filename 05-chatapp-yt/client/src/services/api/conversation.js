import customFetch from '../../utils/axios'

export const getConversations = async () => {
    try {
        const resp = await customFetch.get('/user/')
        return resp.data
    } catch (err) {
        throw err.response.data.msg
    }
}
