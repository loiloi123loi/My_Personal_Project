const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    let customErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong try again later',
        data: err.data || {},
    }

    console.log(err)

    if (
        err.name === 'SequelizeUniqueConstraintError' &&
        err.original.code === 'ER_DUP_ENTRY'
    ) {
        customErr.statusCode = StatusCodes.BAD_REQUEST
        customErr.message = 'Invalid fields value'
        err.errors.map((item) => {
            const { path, message } = item
            customErr.data[path] = message
        })
    }

    if (err.name === 'SequelizeValidationError') {
        customErr.statusCode = StatusCodes.BAD_REQUEST
        customErr.message = 'Invalid fields value'
        err.errors.map((item) => {
            const { path, message } = item
            customErr.data[path] = message
        })
    }

    res.status(customErr.statusCode).json({
        message: customErr.message,
        data: customErr.data,
    })
}

module.exports = errorHandler
