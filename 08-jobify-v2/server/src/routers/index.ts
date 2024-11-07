import { Express } from 'express'
import { ROUTE } from '@/constants/path'
import { errorHandler, notFoundHandler } from '@/middlewares/errors.middlewares'
import jobsRouter from '@/routers/jobs.routes'
import usersRouter from '@/routers/users.routes'

export default function createRoutes(app: Express) {
  app.use(ROUTE.USER, usersRouter)
  app.use(ROUTE.JOB, jobsRouter)
  app.use(errorHandler)
  app.use(notFoundHandler)
}
