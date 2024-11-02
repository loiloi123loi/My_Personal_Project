import { checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { USERS_MESSAGES } from '@/constants/messages'
import BaseError from '@/models/errors/Base.errors'
import { confirmPasswordSchema, emailSchema, passwordSchema } from '@/models/validSchemas/users.validSchemas'
import databaseService from '@/services/database.services'
import { verifyToken } from '@/utils/jwt'
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

export const resetPasswordValidator = validate(
  checkSchema(
    {
      forgot_password_token: {
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new BaseError({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_REQUIRED
              })
            }
            try {
              const decoded_forgot_password_token = await verifyToken({
                token: value,
                secretOrPublicKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN
              })
              const { user_id } = decoded_forgot_password_token
              const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
              if (!user) {
                throw new BaseError({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: USERS_MESSAGES.USER_NOT_FOUND
                })
              }
              if (user.forgot_password_token !== value) {
                throw new BaseError({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_INVALID
                })
              }
              req.user = user
              req.decoded_forgot_password_token = decoded_forgot_password_token
            } catch (err) {
              if (err instanceof JsonWebTokenError) {
                throw new BaseError({
                  message: capitalize(err.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              throw err
            }
            return true
          }
        },
        trim: true
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)
