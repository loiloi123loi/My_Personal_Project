import { checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '@/constants/messages'
import { emailSchema, passwordSchema } from '@/models/validSchemas/users.validSchemas'
import databaseService from '@/services/database.services'
import { validate } from '@/utils/validation'

export const registerValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {}
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {}
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const forgotPasswordValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({ email: value })
            if (!user) {
              throw new Error(USERS_MESSAGES.EMAIL_DOES_NOT_EXIST)
            }
            req.user = user
            return true
          }
        }
      }
    },
    ['body']
  )
)
