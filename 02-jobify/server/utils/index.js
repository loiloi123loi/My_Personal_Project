const sendVerifycationEmail = require('../utils/sendVerifycationEmail')
const createTokenUser = require('../utils/createTokenUser')
const {
    attachCookiesToResponse,
    createJWT,
    isTokenValid,
} = require('../utils/jwt')
const createHash = require('../utils/createHash')
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail')

module.exports = {
    sendVerifycationEmail,
    attachCookiesToResponse,
    createTokenUser,
    createJWT,
    isTokenValid,
    createHash,
    sendResetPasswordEmail,
}
