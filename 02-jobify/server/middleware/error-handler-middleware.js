const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something wrong, try again',
    }
    // console.log(customError)
    // console.log(err)
    if (err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
    }
    if (err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.msg = `${Object.keys(err.keyValue)} field has to be unique`
    }
    res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandler
