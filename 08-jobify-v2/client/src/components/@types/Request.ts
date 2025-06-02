import { JobStatusEnum } from '@/utils/enums'

export interface IAllJobParams {
  search?: string
  status?: JobStatusEnum | 'all'
  page?: number
  limit?: number
}
