import { JobStatus, JobType } from '@/constants/enums'

export interface CreateJobReqBody {
  company: string
  position: string
  status: JobStatus
  job_type: JobType
  job_location?: string
}

export interface JobIdReqParams {
  job_id: string
}

export interface UpdateJobReqBody {
  company: string
  position: string
  status: JobStatus
  job_type: JobType
  job_location?: string
}

export interface PagingQuery {
  page?: number
  limit?: number
  sortBy?: string
  orderBy?: 'asc' | 'desc'
}

export interface GetAllJobsReqQuery extends PagingQuery {
  search?: string
  date?: string
  status?: JobStatus
  job_type?: JobType
}
