import { ObjectId } from 'mongodb'
import { JobStatus, JobType } from '@/constants/enums'

interface IJob {
  _id?: ObjectId
  company: string
  position: string
  status: JobStatus
  job_type: JobType
  job_location: string
  created_by: ObjectId
  created_at?: Date
  updated_at?: Date
}

class Job {
  _id: ObjectId
  company: string
  position: string
  status: JobStatus
  job_type: JobType
  job_location: string
  created_by: ObjectId
  created_at: Date
  updated_at: Date

  constructor({ _id, company, position, status, job_type, job_location, created_by, created_at, updated_at }: IJob) {
    const now = new Date()
    this._id = _id || new ObjectId()
    this.company = company
    this.position = position
    this.status = status
    this.job_type = job_type
    this.job_location = job_location
    this.created_by = created_by
    this.created_at = created_at || now
    this.updated_at = updated_at || now
  }
}

export default Job
