import { Server } from 'socket.io'
import { socketMap } from '@/socket.io'
import { INewConversation, INewMessage } from '@/socket.io/types'

export default function createServerFunction(io: Server) {
  io.getOnlineUsers = () => {
    io.emit('getOnlineUsers', Object.keys(socketMap))
  }
  io.newMessage = ({ user_id, message }: INewMessage) => {
    const socket_id = socketMap[user_id]
    if (socket_id) {
      io.to(socket_id).emit('newMessage', message)
    }
  }
  io.newConversation = (payload: INewConversation) => {
    const socket_id = socketMap[payload.user_id]
    if (socket_id) {
      io.to(socket_id).emit('newMessage', payload)
    }
  }
}
