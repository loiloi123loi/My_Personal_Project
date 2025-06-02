import { USER_PATH } from '@/constants/path'
import {
  loginController,
  logoutController,
  registerController,
  resetPasswordController
} from '@/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator
} from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
import { Router } from 'express'
const usersRouter = Router()

usersRouter.route(USER_PATH.REGISTER).post(registerValidator, wrapRequestHandler(registerController))
usersRouter.route(USER_PATH.LOGIN).post(loginValidator, wrapRequestHandler(loginController))
usersRouter
  .route(USER_PATH.LOGOUT)
  .post(accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
usersRouter.route(USER_PATH.RESET_PASSWORD).post(resetPasswordValidator, wrapRequestHandler(resetPasswordController))

export default usersRouter
