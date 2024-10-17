import { checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '@/constants/messages'
import { emailSchema, passwordSchema } from '@/models/validSchemas/users.validSchemas'
import databaseService from '@/services/database.services'
import { hashPassword } from '@/utils/crypto'
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
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (!user) {
              throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
            }
            req.user = user
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)
