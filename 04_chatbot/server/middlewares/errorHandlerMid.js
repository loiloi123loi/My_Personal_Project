const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    let customError = {
        message: err.message || 'Something was wrong, please try later',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    }

    console.log(err)

    if (err.name === 'SequelizeValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
    }

    res.status(customError.statusCode).json({ msg: customError.message })
}

module.exports = errorHandler
