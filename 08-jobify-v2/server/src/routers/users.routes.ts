import { Router } from 'express'
import { USER_PATH } from '@/constants/path'
import { registerController, loginController, logoutController } from '@/controllers/users.controllers'
import {
  registerValidator,
  loginValidator,
  accessTokenValidator,
  refreshTokenValidator
} from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
const usersRouter = Router()

usersRouter.route(USER_PATH.REGISTER).post(registerValidator, wrapRequestHandler(registerController))
usersRouter.route(USER_PATH.LOGIN).post(loginValidator, wrapRequestHandler(loginController))
usersRouter
  .route(USER_PATH.LOGOUT)
  .post(accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

export default usersRouter
