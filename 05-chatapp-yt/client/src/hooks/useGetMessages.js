import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { getAllMessages } from '../services/api/message'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true)
                const listMessages = await getAllMessages(
                    selectedConversation._id
                )
                setMessages(listMessages)
            } catch (err) {
                toast.error(err)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages])

    return { loading, messages }
}

export default useGetMessages
