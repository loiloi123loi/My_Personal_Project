import { CreateJobReqBody, GetAllJobsReqQuery, UpdateJobReqBody } from '@/models/requests/Job.requests'
import Job from '@/models/schemas/Job.schemas'
import User from '@/models/schemas/User.schemas'
import databaseService from '@/services/database.services'
import { ObjectId } from 'mongodb'

class JobService {
  async getAllJobs(user_id: string, query: GetAllJobsReqQuery) {
    const { search, status, job_type, page = 1, limit = 10, sortBy = 'created_at', orderBy = 'desc' } = query
    const skip = (page - 1) * limit
    const filter: Record<string, ObjectId | string | object> = { created_by: new ObjectId(user_id) }
    if (search) {
      filter.$or = [{ position: { $regex: search, $options: 'i' } }, { company: { $regex: search, $options: 'i' } }]
    }
    if (status) {
      filter.status = status
    }
    if (job_type) {
      filter.job_type = job_type
    }
    const sort: Record<string, 1 | -1> = {
      [sortBy]: orderBy === 'asc' ? 1 : -1
    }
    const jobs = await databaseService.jobs.find(filter).sort(sort).skip(skip).limit(limit).toArray()
    const totalCount = await databaseService.jobs.countDocuments(filter)
    const totalPages = Math.ceil(totalCount / limit)
    return { jobs, totalCount, totalPages }
  }

  async createJob(user_id: string, payload: CreateJobReqBody) {
    let { job_location } = payload
    if (!job_location) {
      const user = (await databaseService.users.findOne({
        _id: new ObjectId(user_id)
      })) as User
      job_location = user?.location
    }
    const job = await databaseService.jobs.insertOne(
      new Job({
        ...payload,
        job_location,
        created_by: new ObjectId(user_id)
      })
    )
    return { job }
  }

  async deleteJob(user_id: string, job_id: string) {
    await databaseService.jobs.deleteOne({
      _id: new ObjectId(job_id),
      created_by: new ObjectId(user_id)
    })
  }

  async getSingleJob(user_id: string, job_id: string) {
    const job = await databaseService.jobs.findOne({
      _id: new ObjectId(job_id),
      created_by: new ObjectId(user_id)
    })
    return { job }
  }

  async updateJob(user_id: string, job_id: string, payload: UpdateJobReqBody) {
    const { company, position, status, job_type } = payload
    let { job_location } = payload
    if (!job_location) {
      const user = (await databaseService.users.findOne({ _id: new ObjectId(user_id) })) as User
      job_location = user.location
    }
    const job = await databaseService.jobs.findOneAndUpdate(
      { _id: new ObjectId(job_id), created_by: new ObjectId(user_id) },
      {
        $set: { company, position, status, job_type, job_location },
        $currentDate: { updated_at: true }
      },
      {
        returnDocument: 'after'
      }
    )
    return { job }
  }
}

const jobService = new JobService()
export default jobService
