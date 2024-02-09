const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ res, user }) => {
    const tokenJWT = createJWT({ payload: { user } })
    const oneDay = 24 * 60 * 60 * 1000
    res.cookie('jwt', tokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        expires: new Date(Date.now() + oneDay),
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : null,
    })
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
}
