import { JwtPayload } from 'jsonwebtoken'
import { TokenType, VerifyStatus } from '@/constants/enums'

export interface ResetPasswordReqBody {
  forgot_password_token: string
  password: string
  confirm_password: string
}

export interface RegisterReqBody {
  name: string
  email: string
  date_of_birth: string
  location: string
  password: string
  confirm_password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: VerifyStatus
  exp: number
  iat: number
}
