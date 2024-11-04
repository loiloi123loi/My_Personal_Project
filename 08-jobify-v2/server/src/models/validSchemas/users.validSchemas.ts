import { ParamSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { USERS_MESSAGES } from '@/constants/messages'
import BaseError from '@/models/errors/Base.errors'
import databaseService from '@/services/database.services'
import { verifyToken } from '@/utils/jwt'

export const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

export const confirmPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
  },
  custom: {
    options: (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
      }
      return true
    }
  }
}

export const dateOfBirthSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_IS_REQUIRED
  },
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_MUST_BE_ISO8601
  }
}

export const forgotPasswordSchema: ParamSchema = {
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
}
