import { NextFunction, Request, Response } from 'express'

type ResponseReturnType = void | Response

export const wrapRequestHandler = (
  func: (_req: Request, _res: Response, _next: NextFunction) => Promise<ResponseReturnType> | ResponseReturnType
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Promise.resolve(func(req, res, next)).catch(next)
    try {
      await func(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
