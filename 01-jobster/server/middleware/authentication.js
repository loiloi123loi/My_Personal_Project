const jwt = require('jsonwebtoken')
const CustomError = require('../errors')

const authentication = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new CustomError.BadRequestError('Authen invalid')
    }
    const token = authorization.split(' ')[1]
    try {
        const jsonToken = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = jsonToken
        next()
    } catch (err) {
        throw new CustomError.UnauthenticatedError('Authen invalid')
    }
}

module.exports = authentication
