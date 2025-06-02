import * as z from 'zod'
import { JobStatusEnum, JobTypeEnum } from '@/utils/enums'

export type JobType = {
  _id: string
  position: string
  company: string
  status: string
  job_type: string
  location: string
  created_at: Date
  updated_at: Date
}

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.'
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.'
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters.'
  }),
  status: z.nativeEnum(JobStatusEnum),
  job_type: z.nativeEnum(JobTypeEnum)
})

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>
