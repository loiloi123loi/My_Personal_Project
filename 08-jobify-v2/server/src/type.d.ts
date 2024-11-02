import { TokenPayload } from '@/models/requests/User.requests'
import User from '@/models/schemas/User.schemas'

declare module 'express' {
  interface Request {
    user?: User
    decoded_forgot_password_token?: TokenPayload
  }
}
