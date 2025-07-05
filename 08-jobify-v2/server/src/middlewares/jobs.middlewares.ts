import { JobStatus, JobType } from '@/constants/enums'
import { JOBS_MESSAGES } from '@/constants/messages'
import { validate } from '@/utils/validation'
import { checkSchema } from 'express-validator'

export const createJobValidator = validate(
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
          errorMessage: JOBS_MESSAGES.POSITION_IS_REQUIRED
        },
        isString: {
          errorMessage: JOBS_MESSAGES.POSITION_MUST_BE_A_STRING
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

export const jobIdValidator = validate(
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

export const updateJobValidator = validate(
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
          errorMessage: JOBS_MESSAGES.POSITION_IS_REQUIRED
        },
        isString: {
          errorMessage: JOBS_MESSAGES.POSITION_MUST_BE_A_STRING
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

export const getAllJobsValidator = validate(
  checkSchema(
    {
      search: {
        optional: true,
        isString: {
          errorMessage: JOBS_MESSAGES.SEARCH_MUST_BE_A_STRING
        },
        trim: true
      },
      status: {
        optional: true,
        isIn: {
          options: [Object.values(JobStatus)]
        },
        errorMessage: JOBS_MESSAGES.STATUS_MUST_BE_ONE_OF + Object.values(JobStatus).join(', ')
      },
      type: {
        optional: true,
        isIn: {
          options: [Object.values(JobType)]
        },
        errorMessage: JOBS_MESSAGES.TYPE_MUST_BE_ONE_OF + Object.values(JobType).join(', ')
      },
      created_date: {
        optional: true,
        isObject: {
          errorMessage: JOBS_MESSAGES.CREATED_DATE_MUST_BE_AN_OBJECT
        },
        custom: {
          options: (value) => {
            console.log(value.startDate)

            if (value.startDate && value.endDate) {
              if (new Date(value.startDate) > new Date(value.endDate)) {
                throw new Error(JOBS_MESSAGES.CREATED_DATE_RANGE_INVALID)
              }
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)
