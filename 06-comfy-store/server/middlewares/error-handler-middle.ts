import { NextFunction, Request, Response } from 'express'
import CustomAPIError from '../errors/custom-api-error'
import { StatusCodes } from 'http-status-codes'

export default (
    err: CustomAPIError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong',
    }

    console.log(err.message)

    res.status(error.statusCode).json({
        success: false,
        data: {
            messgae: error.message,
        },
    })
}
