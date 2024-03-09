const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-api-error')

class UnauthenticatedError extends CustomAPIError {
    constructor(message, data = {}) {
        super(message, data)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError
