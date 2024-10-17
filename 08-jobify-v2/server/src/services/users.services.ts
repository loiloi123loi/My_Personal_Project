import { TokenType, VerifyStatus } from '@/constants/enums'
import { signToken } from '@/utils/jwt'

class UsersService {
  private signAccessToken({ user_id, verify }: { user_id: string; verify: VerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ACCESS_TOKEN,
        verify
      },
      secret: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({ user_id, verify }: { user_id: string; verify: VerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.REFRESH_TOKEN,
        verify
      },
      secret: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessAndRefreshToken({ user_id, verify }: { user_id: string; verify: VerifyStatus }) {
    return Promise.all([
      this.signAccessToken({
        user_id,
        verify
      }),
      this.signRefreshToken({
        user_id,
        verify
      })
    ])
  }

  async login({ user_id, verify }: { user_id: string; verify: VerifyStatus }) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id,
      verify
    })
    return {
      access_token,
      refresh_token
    }
  }
}

const usersService = new UsersService()
export default usersService
