import { ObjectId } from 'mongodb'
import databaseService from '@/services/database.services'
import { hashPassword } from '@/utils/crypto'

class UsersService {
  login({ user_id }: { user_id: string }) {}

  async resetPassword(user_id: string, password: string) {
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          forgot_password_token: '',
          password: hashPassword(password)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
}

const usersService = new UsersService()
export default usersService
