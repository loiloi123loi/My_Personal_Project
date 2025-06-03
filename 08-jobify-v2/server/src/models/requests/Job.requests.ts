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
