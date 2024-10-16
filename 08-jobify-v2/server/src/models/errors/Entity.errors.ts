import BaseError from './Base.errors'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { COMMON_MESSAGES } from '@/constants/messages'

type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: string | number | boolean | object | undefined
  }
>

export default class EntityError extends BaseError {
  errors: ErrorType

  constructor({ message = COMMON_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
