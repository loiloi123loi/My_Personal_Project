import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getConversations } from '../services/api/conversation'
import { useAuthContext } from '../context/AuthContext'
import { socket } from '../services/socket.io/connect'

const useConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        if (authUser) {
            if (conversations.length == 0) {
                const loadConversations = async () => {
                    try {
                        setLoading(true)
                        const dataUsers = await getConversations()
                        setConversations(dataUsers.users)
                    } catch (err) {
                        toast.error(err)
                    } finally {
                        setLoading(false)
                    }
                }
                loadConversations()
            }
            socket.on('newConversation', (conversation) => {
                setConversations([...conversations, conversation])
            })
        }
    }, [authUser])

    return { loading, conversations }
}

export default useConversation
