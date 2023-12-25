const sendEmail = require('./sendEmail')
const sendVerifycationEmail = require('./sendVerifycationEmail')
const sendResetPasswordEmail = require('./sendResetPasswordEmail')
const createTokenUser = require('./createTokenUser')
const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')
const createHash = require('./createHash')
const passport = require('./passport')

module.exports = {
    sendEmail,
    sendVerifycationEmail,
    sendResetPasswordEmail,
    createTokenUser,
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createHash,
    passport,
}
