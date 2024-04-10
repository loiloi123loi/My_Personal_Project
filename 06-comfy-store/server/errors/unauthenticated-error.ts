import CustomAPIError from './custom-api-error'
import { StatusCodes } from 'http-status-codes'

class UnauthenticatedError extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED)
    }
}

export default UnauthenticatedError
