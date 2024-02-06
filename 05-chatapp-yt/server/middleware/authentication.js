const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authentication = async (req, res, next) => {
    try {
        const { jwt } = req.signedCookies
        const isValid = isTokenValid(jwt)
        if (!isValid) {
            throw new CustomError.UnauthorizedError('Invalid credentials')
        }
        req.user = isValid.user
        next()
    } catch (err) {
        throw new CustomError.UnauthorizedError('Invalid credentials')
    }
}

module.exports = authentication
