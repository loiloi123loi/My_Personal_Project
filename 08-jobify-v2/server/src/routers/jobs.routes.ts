import { JOB_PATH } from '@/constants/path'
import {
  createJobController,
  deleteJobController,
  generateDataController,
  getAllJobsController,
  getChartsController,
  getSingleJobController,
  getStatsController,
  updateJobController
} from '@/controllers/jobs.controllers'
import { pagingValidator } from '@/middlewares/commons.middlewares'
import {
  createJobValidator,
  getAllJobsValidator,
  jobIdValidator,
  updateJobValidator
} from '@/middlewares/jobs.middlewares'
import { accessTokenValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
import { Router } from 'express'
const jobsRouter = Router()

jobsRouter.use(accessTokenValidator)
jobsRouter
  .route(JOB_PATH.GET_ALL_JOBS)
  .get(getAllJobsValidator, pagingValidator, wrapRequestHandler(getAllJobsController))
  .post(createJobValidator, wrapRequestHandler(createJobController))
jobsRouter.route(JOB_PATH.STATS).get(wrapRequestHandler(getStatsController))
jobsRouter
  .route(JOB_PATH.CHARTS)
  .get(wrapRequestHandler(getChartsController))
  .post(wrapRequestHandler(generateDataController))
jobsRouter
  .route(JOB_PATH.ID_JOB)
  .delete(jobIdValidator, wrapRequestHandler(deleteJobController))
  .get(jobIdValidator, wrapRequestHandler(getSingleJobController))
  .patch(jobIdValidator, updateJobValidator, wrapRequestHandler(updateJobController))

export default jobsRouter
