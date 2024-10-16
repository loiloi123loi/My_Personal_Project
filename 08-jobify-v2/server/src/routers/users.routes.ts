import { Router } from 'express'
import { USER_PATH } from '@/constants/path'
import { registerController, loginController } from '@/controllers/users.controllers'
import { registerValidator, loginValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
const usersRouter = Router()

usersRouter.route(USER_PATH.REGISTER).post(registerValidator, wrapRequestHandler(registerController))
usersRouter.route(USER_PATH.LOGIN).post(loginValidator, wrapRequestHandler(loginController))

export default usersRouter
