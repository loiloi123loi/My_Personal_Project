import { TokenPayload } from '@/models/requests/User.requests'
import User from '@/models/schemas/User.schemas'
import { INewMessage } from '@/socket.io/types'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}

declare module 'socket.io' {
  interface Server {
    getOnlineUsers: () => void
    newMessage: (payload: INewMessage) => void
    newConversation: (payload: ISendMessage) => void
  }
}
