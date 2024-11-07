import { Request, Response } from 'express'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { JOBS_MESSAGES } from '@/constants/messages'
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
