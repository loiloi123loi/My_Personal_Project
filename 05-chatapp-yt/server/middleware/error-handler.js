const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    let cusErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, try later...',
    }
    console.log(err)
    res.status(cusErr.statusCode).json({
        msg: cusErr.message,
    })
}

module.exports = errorHandler
