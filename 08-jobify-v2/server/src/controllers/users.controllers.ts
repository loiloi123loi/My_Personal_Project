import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { USERS_MESSAGES } from '@/constants/messages'
import User from '@/models/schemas/User.schemas'
import usersService from '@/services/users.services'

export const registerController = async (req: Request, res: Response) => {}

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login({
    user_id: user_id.toString(),
    verify: user.verify
  })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}
