import { HTTP_STATUS } from '@/constants/httpStatus'
import { JOBS_MESSAGES } from '@/constants/messages'
import { CreateJobReqBody, GetAllJobsReqQuery, JobIdReqParams, UpdateJobReqBody } from '@/models/requests/Job.requests'
import { TokenPayload } from '@/models/requests/User.requests'
import jobService from '@/services/jobs.services'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const getAllJobsController = async (
  req: Request<ParamsDictionary, unknown, unknown, GetAllJobsReqQuery>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await jobService.getAllJobs(user_id, req.query)
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

export const deleteJobController = async (req: Request<JobIdReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { job_id } = req.params
  await jobService.deleteJob(user_id, job_id)
  res.status(HTTP_STATUS.OK).json({
    message: JOBS_MESSAGES.DELETE_JOB_SUCCESS
  })
}

export const getSingleJobController = async (req: Request<JobIdReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await jobService.getSingleJob(user_id, req.params.job_id)
  if (!result.job) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: JOBS_MESSAGES.JOB_NOT_FOUND
    })
  }
  res.status(HTTP_STATUS.OK).json({
    message: JOBS_MESSAGES.GET_SINGLE_JOB_SUCCESS,
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

export const getStatsController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await jobService.getStats(user_id)

  res.status(HTTP_STATUS.OK).json({
    message: JOBS_MESSAGES.GET_STATS_SUCCESS,
    result
  })
}

export const getChartsController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await jobService.getCharts(user_id)

  res.status(HTTP_STATUS.OK).json({
    message: JOBS_MESSAGES.GET_CHARTS_SUCCESS,
    result
  })
}

export const generateDataController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await jobService.generateData(user_id)

  res.status(HTTP_STATUS.OK).json({
    message: JOBS_MESSAGES.GENERATE_DATA_SUCCESS,
    result
  })
}
