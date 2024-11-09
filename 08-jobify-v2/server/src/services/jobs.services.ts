import { ObjectId } from 'mongodb'
import databaseService from '@/services/database.services'

class JobService {
  async getAllJobs(user_id: string) {
    const jobs = await databaseService.jobs.find({ created_by: new ObjectId(user_id) }).toArray()
    return { jobs }
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
