import { checkSchema } from 'express-validator'
import { JobStatus, JobType } from '@/constants/enums'
import { JOBS_MESSAGES } from '@/constants/messages'
import { validate } from '@/utils/validation'

export const createJobMMiddleware = validate(
  checkSchema(
    {
      company: {
        notEmpty: {
          errorMessage: JOBS_MESSAGES.COMPANY_IS_REQUIRED
        },
        isString: {
          errorMessage: JOBS_MESSAGES.COMPANY_MUST_BE_A_STRING
        },
        trim: true
      },
      position: {
        notEmpty: {
          errorMessage: JOBS_MESSAGES.POSTION_IS_REQUIRED
        },
        isString: {
          errorMessage: JOBS_MESSAGES.POSTION_MUST_BE_A_STRING
        },
        trim: true
      },
      status: {
        isIn: {
          options: [Object.values(JobStatus)]
        },
        errorMessage: JOBS_MESSAGES.STATUS_MUST_BE_ONE_OF + Object.values(JobStatus).join(', ')
      },
      job_type: {
        isIn: {
          options: [Object.values(JobType)]
        },
        errorMessage: JOBS_MESSAGES.TYPE_MUST_BE_ONE_OF + Object.values(JobType).join(', ')
      },
      job_location: {
        optional: true,
        isString: {
          errorMessage: JOBS_MESSAGES.LOCATION_MUST_BE_A_STRING
        },
        trim: true
      }
    },
    ['body']
  )
)
