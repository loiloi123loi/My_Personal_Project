import { Router } from 'express'
import { JOB_PATH } from '@/constants/path'
import { getAllJobsController, getSingleJobController } from '@/controllers/jobs.controllers'
import { getSingleJobValidator } from '@/middlewares/jobs.middlewares'
import { accessTokenValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
const jobsRouter = Router()

jobsRouter.route(JOB_PATH.GET_ALL_JOBS).get(accessTokenValidator, wrapRequestHandler(getAllJobsController))
jobsRouter
  .route(JOB_PATH.GET_SINGLE_JOB)
  .get(accessTokenValidator, getSingleJobValidator, wrapRequestHandler(getSingleJobController))

export default jobsRouter
