import { Router } from 'express'
import { JOB_PATH } from '@/constants/path'
import { createJobController, getAllJobsController } from '@/controllers/jobs.controllers'
import { createJobMMiddleware } from '@/middlewares/jobs.middlewares'
import { accessTokenValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
const jobsRouter = Router()

jobsRouter
  .route(JOB_PATH.GET_ALL_JOBS)
  .get(accessTokenValidator, wrapRequestHandler(getAllJobsController))
  .post(accessTokenValidator, createJobMMiddleware, wrapRequestHandler(createJobController))

export default jobsRouter
