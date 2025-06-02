import { CreateJobReqBody } from '@/models/requests/Job.requests'
import Job from '@/models/schemas/Job.schemas'
import User from '@/models/schemas/User.schemas'
import databaseService from '@/services/database.services'
import { ObjectId } from 'mongodb'

class JobService {
  async getAllJobs(user_id: string) {
    const jobs = await databaseService.jobs.find({ created_by: new ObjectId(user_id) }).toArray()
    return { jobs }
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
}

const jobService = new JobService()
export default jobService
