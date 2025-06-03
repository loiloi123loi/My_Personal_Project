import { JOB_PATH } from '@/constants/path'
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  getSingleJobController,
  updateJobController
} from '@/controllers/jobs.controllers'
import { createJobMMiddleware, jobIdValidator, updateJobValidator } from '@/middlewares/jobs.middlewares'
import { accessTokenValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
import { Router } from 'express'
const jobsRouter = Router()

jobsRouter
  .route(JOB_PATH.GET_ALL_JOBS)
  .get(accessTokenValidator, wrapRequestHandler(getAllJobsController))
  .post(accessTokenValidator, createJobMMiddleware, wrapRequestHandler(createJobController))
jobsRouter
  .route(JOB_PATH.DELETE_JOB)
  .delete(accessTokenValidator, jobIdValidator, wrapRequestHandler(deleteJobController))
jobsRouter
  .route(JOB_PATH.GET_SINGLE_JOB)
  .get(accessTokenValidator, jobIdValidator, wrapRequestHandler(getSingleJobController))
jobsRouter
  .route(JOB_PATH.UPDATE_JOB)
  .patch(accessTokenValidator, jobIdValidator, updateJobValidator, wrapRequestHandler(updateJobController))

export default jobsRouter
