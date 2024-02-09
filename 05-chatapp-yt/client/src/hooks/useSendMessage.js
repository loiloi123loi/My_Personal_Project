import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { sendMessageTogether } from '../services/api/message'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    const sendMessage = async (message) => {
        try {
            setLoading(true)
            const data = await sendMessageTogether({
                conversationId: selectedConversation._id,
                content: message,
            })
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { sendMessage, loading }
}

export default useSendMessage
