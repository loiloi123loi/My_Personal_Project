import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { USERS_MESSAGES } from '@/constants/messages'
import { ResetPasswordReqBody } from '@/models/requests/User.requests'
import User from '@/models/schemas/User.schemas'
import usersService from '@/services/users.services'

export const registerController = async (req: Request, res: Response) => {}

export const loginController = async (req: Request, res: Response) => {}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, unknown, ResetPasswordReqBody>,
  res: Response
) => {
  const { _id } = req.user as User
  const { password } = req.body
  await usersService.resetPassword((_id as ObjectId).toString(), password)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
  })
}
