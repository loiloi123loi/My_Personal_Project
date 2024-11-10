import { ObjectId } from 'mongodb'
import databaseService from '@/services/database.services'

class JobService {
  async getAllJobs(user_id: string) {
    const jobs = await databaseService.jobs.find({ created_by: new ObjectId(user_id) }).toArray()
    return { jobs }
  }

  async deleteJob(user_id: string, job_id: string) {
    await databaseService.jobs.deleteOne({
      _id: new ObjectId(job_id),
      created_by: new ObjectId(user_id)
    })
  }
}

const jobService = new JobService()
export default jobService
