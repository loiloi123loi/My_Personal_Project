import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { TokenType, VerifyStatus } from '@/constants/enums'
import { RegisterReqBody } from '@/models/requests/User.requests'
import User from '@/models/schemas/User.schemas'
import { hashPassword } from '@/utils/crypto'
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

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password),
        username: 'User' + user_id
      })
    )
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id: user_id.toString(),
      verify: VerifyStatus.UNVERIFIED
    })
    return {
      access_token,
      refresh_token
    }
  }

  async login({ user_id }: { user_id: string }) {}
}

const usersService = new UsersService()
export default usersService
