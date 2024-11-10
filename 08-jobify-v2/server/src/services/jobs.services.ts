import { ObjectId } from 'mongodb'
import { UpdateJobReqBody } from '@/models/requests/Job.requests'
import User from '@/models/schemas/User.schemas'
import databaseService from '@/services/database.services'

class JobService {
  async getAllJobs(user_id: string) {
    const jobs = await databaseService.jobs.find({ created_by: new ObjectId(user_id) }).toArray()
    return { jobs }
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
