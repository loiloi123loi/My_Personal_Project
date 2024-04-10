import { Response, Request, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        data: {
            message: 'Route not found',
        },
    })
}
