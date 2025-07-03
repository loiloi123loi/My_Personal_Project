import { JobType } from '@/utils/types'

type IBaseResponse<T> = {
  message: string
  result: T
}

type TPagingResponse = {
  totalCount: number
  totalPages: number
  page: number | string
  pageSize: number | string
}

type JobListResult = {
  jobs: JobType[]
} & TPagingResponse

type StatsResult = {
  pending: number
  interview: number
  declined: number
}

type ChartsResult = {
  data: number[]
}

export type GetAllJobsResponse = IBaseResponse<JobListResult>
export type GetStatsResponse = IBaseResponse<StatsResult>
export type GetChartsDataResponse = IBaseResponse<ChartsResult>
