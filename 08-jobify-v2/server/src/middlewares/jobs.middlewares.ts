import { checkSchema } from 'express-validator'
import { JOBS_MESSAGES } from '@/constants/messages'
import { validate } from '@/utils/validation'

export const getSingleJobValidator = validate(
  checkSchema(
    {
      job_id: {
        isMongoId: {
          errorMessage: JOBS_MESSAGES.JOB_ID_IS_INVALID
        }
      }
    },
    ['params']
  )
)
