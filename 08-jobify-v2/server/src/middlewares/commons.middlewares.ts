import { COMMONS_MESSAGES } from '@/constants/messages'
import { validate } from '@/utils/validation'
import { checkSchema } from 'express-validator'

export const pagingValidator = validate(
  checkSchema(
    {
      page: {
        optional: true,
        isInt: {
          errorMessage: COMMONS_MESSAGES.PAGE_MUST_BE_INTEGER_AND_NON_NEGATIVE,
          options: {
            min: 1
          }
        },
        toInt: true,
        default: {
          options: {
            min: 1
          }
        }
      },
      limit: {
        optional: true,
        isInt: {
          errorMessage: COMMONS_MESSAGES.LIMIT_MUST_BE_INTEGER_AND_NON_NEGATIVE,
          options: {
            min: 1
          }
        },
        toInt: true,
        default: {
          options: {
            min: 1
          }
        }
      },
      sortBy: {
        optional: true,
        isString: {
          errorMessage: COMMONS_MESSAGES.SORT_BY_MUST_BE_STRING
        }
      },
      orderBy: {
        optional: true,
        isIn: {
          options: [['asc', 'desc']],
          errorMessage: COMMONS_MESSAGES.ORDER_BY_MUST_BE_ASC_OR_DESC
        }
      }
    },
    ['query']
  )
)
