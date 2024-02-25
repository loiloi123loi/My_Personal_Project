const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    let customErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong try again later',
    }

    console.log(err)

    res.status(customErr.statusCode).json({ msg: customErr.message })
}

module.exports = errorHandler
