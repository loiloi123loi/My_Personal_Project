import { Express } from 'express'
import { ROUTE } from '@/constants/path'
import { errorHandler, notFoundHandler } from '@/middlewares/errors.middlewares'
import usersRouter from '@/routers/users.routes'

export default function createRoutes(app: Express) {
  app.use(ROUTE.USER, usersRouter)
  app.use(errorHandler)
  app.use(notFoundHandler)
}
