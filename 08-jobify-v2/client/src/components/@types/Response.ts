import { JobType } from '@/utils/types'

export interface GetAllJobsResponse {
  result: {
    jobs: JobType[]
    count: number
    page: number
    totalPages: number
  }
}

export interface GetStatsResponse {
  result: {
    pending: number
    interview: number
    declined: number
  }
}

export interface GetChartsDataResponse {
  result: {
    data: number[]
  }
}
