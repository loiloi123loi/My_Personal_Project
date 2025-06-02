import { USER_PATH } from '@/constants/path'
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
  verifyForgotPasswordController
} from '@/controllers/users.controllers'
import {
  accessTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyForgotPasswordValidator
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
usersRouter.route(USER_PATH.FORGOT_PASSWORD).post(forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
usersRouter
  .route(USER_PATH.VERIFY_FORGOT_PASSWORD)
  .post(verifyForgotPasswordValidator, wrapRequestHandler(verifyForgotPasswordController))

export default usersRouter
