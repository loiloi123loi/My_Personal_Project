import { ObjectId } from 'mongodb'
import databaseService from '@/services/database.services'

class JobService {
  async getAllJobs(user_id: string) {
    const jobs = await databaseService.jobs.find({ created_by: new ObjectId(user_id) }).toArray()
    return { jobs }
  }
}

const jobService = new JobService()
export default jobService
