import { Router } from 'express'
import { JOB_PATH } from '@/constants/path'
import { getAllJobsController, updateJobController } from '@/controllers/jobs.controllers'
import { jobIdValidator, updateJobValidator } from '@/middlewares/jobs.middlewares'
import { accessTokenValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
const jobsRouter = Router()

jobsRouter.route(JOB_PATH.GET_ALL_JOBS).get(accessTokenValidator, wrapRequestHandler(getAllJobsController))
jobsRouter
  .route(JOB_PATH.UPDATE_JOB)
  .patch(accessTokenValidator, jobIdValidator, updateJobValidator, wrapRequestHandler(updateJobController))

export default jobsRouter
