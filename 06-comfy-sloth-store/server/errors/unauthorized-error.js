const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-api-error')

class UnauthorizedError extends CustomAPIError {
    constructor(message, data = {}) {
        super(message, data)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = UnauthorizedError
