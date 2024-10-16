import databaseService from './database.services'
import { RegisterReqBody } from '@/models/requests/User.requests'

class UsersService {
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  async register(body: RegisterReqBody) {}
  async login({ user_id }: { user_id: string }) {}
}

const usersService = new UsersService()
export default usersService
