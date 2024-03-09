const CustomError = require('../errors')
const { Token } = require('../models')
const { isTokenValid } = require('../utils')

const authentication = async (req, res, next) => {
    try {
        const accessToken = req.headers['authorization']
        if (accessToken && accessToken.startsWith('Bearer ')) {
            const payload = isTokenValid(accessToken.split(' ')[1])
            req.user = payload.user
            return next()
        }
    } catch (err) {}
    try {
        const refreshToken = req.headers['refreshtoken']
        if (!refreshToken) {
            throw new CustomError.UnauthenticatedError('Authenticated Failed')
        }
        const payload = isTokenValid(refreshToken)
        const isExistToken = await Token.findOne({
            userId: payload.user.id,
            refreshToken,
            deletedAt: null,
        })
        if (!isExistToken || !isExistToken?.isValid) {
            throw new CustomError.UnauthenticatedError('Authenticated Failed')
        }
        req.user = payload.user
        next()
    } catch (err) {
        throw new CustomError.UnauthenticatedError('Authenticated Failed')
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError(
                'Unauthorized to access this route'
            )
        }
        next()
    }
}

module.exports = {
    authentication,
    authorizePermissions,
}
