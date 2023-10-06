const CustomError = require('../errors')
const { isTokenValid, attachCookiesToResponse } = require('../utils/jwt')
const Token = require('../models/Token')

const authentication = async (req, res, next) => {
    const { refreshToken, accessToken } = req.signedCookies
    try {
        if (accessToken) {
            const payload = isTokenValid(accessToken)
            req.user = payload.user
            return next()
        }
        if (!refreshToken) {
            throw new CustomError.UnAuthenticatedError(`Authentication Failed`)
        }
        const payload = isTokenValid(refreshToken)
        const existToken = await Token.findOne({
            user: payload.user.id,
            refreshToken,
        })
        if (!existToken || !existToken?.isValid) {
            throw new CustomError.UnAuthenticatedError(`Authentication Failed`)
        }
        attachCookiesToResponse({ res, user: payload.user, refreshToken })
        req.user = payload.user
        next()
    } catch (err) {
        // console.log(err)
        throw new CustomError.UnAuthenticatedError(`Authentication Failed`)
    }
}

module.exports = authentication
