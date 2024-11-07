import { Router } from 'express'
import { JOB_PATH } from '@/constants/path'
import { getAllJobsController } from '@/controllers/jobs.controllers'
import { accessTokenValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
const jobsRouter = Router()

jobsRouter.route(JOB_PATH.GET_ALL_JOBS).get(accessTokenValidator, wrapRequestHandler(getAllJobsController))

export default jobsRouter
