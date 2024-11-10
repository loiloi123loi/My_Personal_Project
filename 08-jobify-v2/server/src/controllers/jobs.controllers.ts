import { Request, Response } from 'express'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { JOBS_MESSAGES } from '@/constants/messages'
import { JobIdReqParams, UpdateJobReqBody } from '@/models/requests/Job.requests'
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

export const updateJobController = async (req: Request<JobIdReqParams, unknown, UpdateJobReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { job_id } = req.params
  const result = await jobService.updateJob(user_id, job_id, req.body)
  if (!result.job) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: JOBS_MESSAGES.JOB_NOT_FOUND
    })
  }
  res.status(HTTP_STATUS.OK).json({
    message: JOBS_MESSAGES.UPDATE_JOB_SUCCESS,
    result
  })
}
