import { JobStatusEnum, JobTypeEnum } from '@/utils/enums'
import { z } from 'zod'

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.'
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.'
  }),
  job_location: z.string().min(2, {
    message: 'location must be at least 2 characters.'
  }),
  status: z.nativeEnum(JobStatusEnum),
  job_type: z.nativeEnum(JobTypeEnum)
})

export const searchFormSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  created_at: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional()
  })
})
