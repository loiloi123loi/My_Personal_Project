const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
    const accessTokenJWT = createJWT({ payload: { user } })
    const refreshTokenJWT = createJWT({ payload: { user, refreshToken } })
    const oneDay = 24 * 60 * 60 * 1000
    const longerExp = 30 * 24 * 60 * 60 * 1000
    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        expires: new Date(Date.now() + oneDay),
        sameSite: 'none',
    })
    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        expires: new Date(Date.now() + longerExp),
        sameSite: 'none',
    })
}

module.exports = {
    createJWT,
    attachCookiesToResponse,
    isTokenValid,
}
