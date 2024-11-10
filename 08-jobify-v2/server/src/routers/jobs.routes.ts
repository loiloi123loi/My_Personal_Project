import { Router } from 'express'
import { JOB_PATH } from '@/constants/path'
import { deleteJobController, getAllJobsController } from '@/controllers/jobs.controllers'
import { jobIdValidator } from '@/middlewares/jobs.middlewares'
import { accessTokenValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
const jobsRouter = Router()

jobsRouter.route(JOB_PATH.GET_ALL_JOBS).get(accessTokenValidator, wrapRequestHandler(getAllJobsController))
jobsRouter
  .route(JOB_PATH.DELETE_JOB)
  .delete(accessTokenValidator, jobIdValidator, wrapRequestHandler(deleteJobController))

export default jobsRouter
