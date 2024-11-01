import { ObjectId } from 'mongodb'
import { TokenType } from '@/constants/enums'
import databaseService from '@/services/database.services'
import { signToken } from '@/utils/jwt'

class UsersService {
  private async signForgotPasswordToken({ user_id }: { user_id: string }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.FORGOT_PASSWORD_TOKEN
      },
      secret: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: {
        expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN
      }
    })
  }

  login({ user_id }: { user_id: string }) {}

  async forgotPassword(user_id: string) {
    const forgot_password_token = await this.signForgotPasswordToken({ user_id })
    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          forgot_password_token,
          updated_at: '$$NOW'
        }
      }
    ])
  }
}

const usersService = new UsersService()
export default usersService
