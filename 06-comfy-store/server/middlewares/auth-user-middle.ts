import { Request, Response, NextFunction } from 'express'
import CustomError from '../errors'
import { isTokenValid } from '../utils'

export default async (req: Request, res: Response, next: NextFunction) => {
    let token
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token
    }
    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }
    try {
        const payload = isTokenValid(token)
        req.user = payload.token
        next()
    } catch (err) {
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }
}

export const authorizePermissions = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role!)) {
            throw new CustomError.UnauthorizedError(
                'Unauthorized to access this route'
            )
        }
        next()
    }
}
