const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-api-error')

class BadRequestError extends CustomAPIError {
    constructor(message, data = {}) {
        super(message, data)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError
