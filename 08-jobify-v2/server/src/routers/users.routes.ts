import { Router } from 'express'
import { USER_PATH } from '@/constants/path'
import { registerController, loginController, resetPasswordController } from '@/controllers/users.controllers'
import { registerValidator, loginValidator, resetPasswordValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
const usersRouter = Router()

usersRouter.route(USER_PATH.REGISTER).post(registerValidator, wrapRequestHandler(registerController))
usersRouter.route(USER_PATH.LOGIN).post(loginValidator, wrapRequestHandler(loginController))
usersRouter.route(USER_PATH.RESET_PASSWORD).post(resetPasswordValidator, wrapRequestHandler(resetPasswordController))

export default usersRouter
