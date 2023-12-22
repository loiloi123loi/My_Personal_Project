const sendEmail = require('./sendEmail')
const sendVerifycationEmail = require('./sendVerifycationEmail')
const createTokenUser = require('./createTokenUser')
const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')

module.exports = {
    sendEmail,
    sendVerifycationEmail,
    createTokenUser,
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
}
