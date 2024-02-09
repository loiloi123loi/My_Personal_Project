import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import { createNewIO, socket as pSocket } from '../services/socket.io/connect'

const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        if (authUser) {
            createNewIO({ userId: authUser.id })
            pSocket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users)
            })
            setSocket(pSocket)
            return () => pSocket?.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}
