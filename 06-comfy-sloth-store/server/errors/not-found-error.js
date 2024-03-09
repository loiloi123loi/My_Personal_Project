const CustomAPIError = require('./custom-api-error')
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends CustomAPIError {
    constructor(message, data = {}) {
        super(message, data)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError
