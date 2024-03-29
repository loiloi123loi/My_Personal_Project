const CustomAPIError = require('./customAPIError')
const { StatusCodes } = require('http-status-codes')

class UnAuthorizedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthorizedError
