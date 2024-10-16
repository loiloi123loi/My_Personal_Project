import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import EntityError from '@/models/errors/Entity.errors'

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
      entityError.errors[key] = errorsObj[key]
    }
    next(entityError)
  }
}
