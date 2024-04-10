import CustomAPIError from './custom-api-error'
import { StatusCodes } from 'http-status-codes'

class NotFoundError extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND)
    }
}

export default NotFoundError
