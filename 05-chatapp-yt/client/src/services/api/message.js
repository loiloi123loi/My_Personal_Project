import customFetch from '../../utils/axios'

export const getAllMessages = async (conversationId) => {
    try {
        const resp = await customFetch.get(`/message/${conversationId}`)
        return resp.data
    } catch (err) {
        throw err.response.data.msg
    }
}

export const sendMessageTogether = async ({ conversationId, content }) => {
    try {
        const resp = await customFetch.post(`/message/send/${conversationId}`, {
            content,
        })
        return resp.data
    } catch (err) {
        throw err.response.data.msg
    }
}
