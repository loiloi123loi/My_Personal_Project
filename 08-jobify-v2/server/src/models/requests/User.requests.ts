import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '@/constants/enums'

export interface ResetPasswordReqBody {
  forgot_password_token: string
  password: string
  confirm_password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  exp: number
  iat: number
}
