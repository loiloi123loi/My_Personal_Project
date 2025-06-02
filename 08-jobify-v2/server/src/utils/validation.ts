import { HTTP_STATUS } from '@/constants/httpStatus'
import BaseError from '@/models/errors/Base.errors'
import EntityError from '@/models/errors/Entity.errors'
import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

export const validate = (validator: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validator.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const errorsObj = errors.mapped()
    const entityError = new EntityError({
      errors: {}
    })
    for (const key in errorsObj) {
      const { msg } = errorsObj[key]
      if (msg instanceof BaseError && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        errorsObj[key] = errorsObj[key].msg
        return next(msg)
      }
      entityError.errors[key] = errorsObj[key]
    }
    next(entityError)
  }
}
