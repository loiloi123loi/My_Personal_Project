import { HTTP_STATUS } from '@/constants/httpStatus'
import { USERS_MESSAGES } from '@/constants/messages'
import BaseError from '@/models/errors/Base.errors'
import {
  confirmPasswordSchema,
  dateOfBirthSchema,
  emailSchema,
  forgotPasswordSchema,
  passwordSchema
} from '@/models/validSchemas/users.validSchemas'
import databaseService from '@/services/database.services'
import usersService from '@/services/users.services'
import { hashPassword } from '@/utils/crypto'
import { verifyToken } from '@/utils/jwt'
import { validate } from '@/utils/validation'
import { Request } from 'express'
import { checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { ObjectId } from 'mongodb'

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 50
          },
          errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_50
        }
      },
      email: {
        ...emailSchema,
        custom: {
          options: async (value) => {
            const isExist = await usersService.checkEmailExist(value)
            if (isExist) {
              throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
            }
            return true
          }
        }
      },
      date_of_birth: dateOfBirthSchema,
      location: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.LOCATION_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.LOCATION_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 50
          },
          errorMessage: USERS_MESSAGES.LOCATION_LENGTH_MUST_BE_FROM_1_TO_50
        }
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
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

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value: string, { req }) => {
            if (!value.startsWith('Bearer ')) {
              throw new BaseError({
                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            const access_token = value.split('Bearer ')[1]
            if (!access_token) {
              throw new BaseError({
                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            try {
              const decoded_authorization = await verifyToken({
                token: access_token,
                secretPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN
              })
              ;(req as Request).decoded_authorization = decoded_authorization
            } catch (err) {
              throw new BaseError({
                message: capitalize((err as JsonWebTokenError).message),
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value: string, { req }) => {
            try {
              const [decoded_refresh_token, refresh_token] = await Promise.all([
                verifyToken({
                  token: value,
                  secretPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN
                }),
                databaseService.refreshTokens.findOne({
                  token: value
                })
              ])
              if (!refresh_token) {
                throw new BaseError({
                  message: USERS_MESSAGES.REFRESH_TOKEN_USED_OR_NOT_EXIST,
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              ;(req as Request).decoded_refresh_token = decoded_refresh_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new BaseError({
                  message: capitalize(error.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
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
                secretPublicKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN
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

export const verifyForgotPasswordValidator = validate(
  checkSchema(
    {
      forgot_password_token: forgotPasswordSchema
    },
    ['body']
  )
)
