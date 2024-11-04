import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { USERS_MESSAGES } from '@/constants/messages'
import { ForgotPasswordReqBody } from '@/models/requests/User.requests'
import { RegisterReqBody } from '@/models/requests/User.requests'
import User from '@/models/schemas/User.schemas'
import usersService from '@/services/users.services'

export const registerController = async (req: Request<ParamsDictionary, unknown, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const loginController = async (req: Request, res: Response) => {}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, unknown, ForgotPasswordReqBody>,
  res: Response
) => {
  const { _id } = req.user as User
  await usersService.forgotPassword((_id as ObjectId).toString())
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.CHECK_YOUR_EMAIL_AND_FOLLOW_THE_INSTRUCTIONS_TO_RESET_YOUR_PASSWORD
  })
}
