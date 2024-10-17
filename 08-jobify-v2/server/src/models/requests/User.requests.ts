import { TokenType, VerifyStatus } from '@/constants/enums'

export interface RegisterReqBody {
  name: string
  email: string
  date_of_birth: string
  location: string
  password: string
  confirm_password: string
}

export interface TokenPayload {
  user_id: string
  token_type: TokenType
  verify: VerifyStatus
  exp: number
  iat: number
}
