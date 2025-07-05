import { JobStatus, JobType } from '@/constants/enums'
import { CreateJobReqBody, GetAllJobsReqQuery, UpdateJobReqBody } from '@/models/requests/Job.requests'
import Job from '@/models/schemas/Job.schemas'
import User from '@/models/schemas/User.schemas'
import databaseService from '@/services/database.services'
import { ObjectId } from 'mongodb'

class JobService {
  async getAllJobs(user_id: string, query: GetAllJobsReqQuery) {
    const {
      search,
      status,
      job_type,
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      orderBy = 'desc',
      created_at
    } = query
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
    if (created_at?.startDate || created_at?.endDate) {
      filter.created_at = {}
      if (created_at.startDate) {
        const date = new Date(created_at.startDate)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        filter.created_at = {
          ...filter.created_at,
          $gte: date
        }
      }
      if (created_at.endDate) {
        const date = new Date(created_at.endDate)
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)
        filter.created_at = {
          ...filter.created_at,
          $lte: date
        }
      }
      console.log(filter.created_at)
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

  async getStats(user_id: string) {
    const userId = new ObjectId(user_id)

    const [pending, interview, declined] = await Promise.all([
      databaseService.jobs.countDocuments({
        created_by: userId,
        status: JobStatus.PENDING
      }),
      databaseService.jobs.countDocuments({
        created_by: userId,
        status: JobStatus.INTERVIEW
      }),
      databaseService.jobs.countDocuments({
        created_by: userId,
        status: JobStatus.DECLINED
      })
    ])

    return {
      pending,
      interview,
      declined
    }
  }

  async getCharts(user_id: string) {
    const userId = new ObjectId(user_id)

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyStats = await databaseService.jobs
      .aggregate([
        {
          $match: {
            created_by: userId,
            created_at: { $gte: sixMonthsAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$created_at' },
              month: { $month: '$created_at' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 }
        }
      ])
      .toArray()

    const data = monthlyStats.map((item) => ({
      date: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count
    }))

    return { data }
  }

  async generateData(user_id: string) {
    const userId = new ObjectId(user_id)

    const jobTypes = [JobType.FULL_TIME, JobType.INTERNSHIP, JobType.PART_TIME, JobType.REMOTE]
    const jobStatuses = [JobStatus.INTERVIEW, JobStatus.DECLINED, JobStatus.PENDING]
    const companies = [
      'Google',
      'Microsoft',
      'Apple',
      'Amazon',
      'Meta',
      'Netflix',
      'Tesla',
      'Uber',
      'Airbnb',
      'Spotify'
    ]
    const positions = [
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'DevOps Engineer',
      'Data Scientist',
      'Product Manager',
      'UI/UX Designer'
    ]
    const locations = ['New York', 'San Francisco', 'Seattle', 'Austin', 'Boston', 'Chicago', 'Los Angeles', 'Denver']

    const jobs = []

    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)

      const jobsInMonth = Math.floor(Math.random() * 8) + 1

      for (let j = 0; j < jobsInMonth; j++) {
        const jobDate = new Date(date)
        jobDate.setDate(Math.floor(Math.random() * 28) + 1)

        jobs.push(
          new Job({
            _id: new ObjectId(),
            company: companies[Math.floor(Math.random() * companies.length)],
            position: positions[Math.floor(Math.random() * positions.length)],
            status: jobStatuses[Math.floor(Math.random() * jobStatuses.length)],
            job_type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
            job_location: locations[Math.floor(Math.random() * locations.length)],
            created_by: userId,
            created_at: jobDate,
            updated_at: jobDate
          })
        )
      }
    }

    databaseService.jobs.insertMany(jobs)
  }
}

const jobService = new JobService()
export default jobService
