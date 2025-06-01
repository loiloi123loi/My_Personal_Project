import { io, socketMap } from '@/socket.io'
import { INewMessage } from '@/socket.io/types'

class SocketService {
  newMessage(user_id: string, payload: INewMessage) {
    const socket_id = socketMap[user_id]
    if (socket_id) {
      io.to(socket_id).emit('newMessage', payload)
    }
  }
}

const socketService = new SocketService()
export default socketService
