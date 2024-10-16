import { Express } from 'express'
import usersRouter from './users.routes'
import { ROUTE } from '@/constants/path'
import { errorHandler, notFoundHandler } from '@/middlewares/errors.middlewares'

export default function createRoutes(app: Express) {
  app.use(ROUTE.USER, usersRouter)
  app.use(errorHandler)
  app.use(notFoundHandler)
}
