import { Express } from 'express'
import { ROUTE } from '@/constants/path'
import { errorHandler, notFoundHandler } from '@/middlewares/errors.middlewares'
import chatsRouter from '@/routers/chats.routes'
import jobsRouter from '@/routers/jobs.routes'
import usersRouter from '@/routers/users.routes'

export default function createRoutes(app: Express) {
  app.use(ROUTE.USER, usersRouter)
  app.use(ROUTE.JOB, jobsRouter)
  app.use(ROUTE.CHAT, chatsRouter)
  app.use(errorHandler)
  app.use(notFoundHandler)
}
