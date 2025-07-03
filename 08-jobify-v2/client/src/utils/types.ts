import { createAndEditJobSchema, searchFormSchema } from '@/utils/schemas'
import { z } from 'zod'

export type JobType = {
  _id: string
  position: string
  company: string
  status: string
  job_type: string
  job_location: string
  created_at: Date
  updated_at: Date
}

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>

export type SearchFormType = z.infer<typeof searchFormSchema>
