import { TokenType, VerifyStatus } from '@/constants/enums'

export interface TokenPayload {
  user_id: string
  token_type: TokenType
  verify: VerifyStatus
  exp: number
  iat: number
}
