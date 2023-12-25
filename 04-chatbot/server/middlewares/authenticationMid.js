const { isTokenValid, attachCookiesToResponse } = require('../utils')
const CustomError = require('../errors')
const { Token } = require('../models')

const authenticaton = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies
    try {
        if (accessToken) {
            const payload = isTokenValid(accessToken)
            req.user = payload.user
            return next()
        }
        if (!refreshToken) {
            throw CustomError.UnAuthorizedError('Authenticated Failed')
        }
        const payload = isTokenValid(refreshToken)
        const isExistToken = await Token.findOne({
            userId: payload.user.id,
            refreshToken,
        })
        if (!isExistToken || !isExistToken?.isValid) {
            throw new CustomError.UnAuthorizedError('Authenticated Failed')
        }
        attachCookiesToResponse({ res, user: payload.user, refreshToken })
        req.user = payload.user
        next()
    } catch (err) {
        throw new CustomError.UnAuthorizedError('Authenticated Failed')
    }
}

module.exports = authenticaton
