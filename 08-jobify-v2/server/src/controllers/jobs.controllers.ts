import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { JOBS_MESSAGES } from '@/constants/messages'
import { CreateJobReqBody } from '@/models/requests/Job.requests'
import { TokenPayload } from '@/models/requests/User.requests'
import jobService from '@/services/jobs.services'

export const getAllJobsController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await jobService.getAllJobs(user_id)
  res.status(HTTP_STATUS.OK).json({
    message: JOBS_MESSAGES.GET_ALL_JOBS_SUCCESS,
    result
  })
}

export const createJobController = async (req: Request<ParamsDictionary, unknown, CreateJobReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await jobService.createJob(user_id, req.body)
  res.status(HTTP_STATUS.OK).json({
    message: JOBS_MESSAGES.CREATE_JOB_SUCCESS,
    result
  })
}
