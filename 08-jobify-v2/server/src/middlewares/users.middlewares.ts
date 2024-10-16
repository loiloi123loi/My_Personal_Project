import { checkSchema } from 'express-validator'
import { emailSchema, passwordSchema } from '@/models/validSchemas/users.validSchemas'
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
