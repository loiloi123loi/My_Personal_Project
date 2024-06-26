import { NextFunction, Request, RequestHandler, Response } from 'express'

export const wrapRequestHandler = <T>(func: RequestHandler<T, any, any, any>) => {
  return async (req: Request<T>, res: Response, next: NextFunction) => {
    // Promise.resolve(func(req, res, next)).catch(next)
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
