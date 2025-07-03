import { JobStatusEnum, JobTypeEnum } from '@/utils/enums'

export interface IAllJobParams {
  search?: string
  status?: JobStatusEnum | 'all'
  type?: JobTypeEnum | 'all'
  page?: number | string
  limit?: number | string
  created_at?: {
    startDate?: string
    endDate?: string
  }
}

export interface ILoginReqBody {
  email: string
  password: string
}
