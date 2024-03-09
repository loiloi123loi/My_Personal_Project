const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { User, Token } = require('../models')
const { createTokenUser, createJWT } = require('../utils')
const crypto = require('crypto')

const register = async (req, res) => {
    const { fullName, email, password } = req.body
    if (!fullName || !email || !password) {
        throw new CustomError.BadRequestError('Please provide all fields', {
            fullName: fullName ? undefined : 'Please provide fullName',
            email: email ? undefined : 'Please provide email',
            password: password ? undefined : 'Please provide password',
        })
    }
    await User.create({
        fullName,
        email,
        password,
    })
    res.status(StatusCodes.OK).json({
        message: 'Register account successfully',
        data: {},
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide all fields', {
            email: email ? undefined : 'Please provide email',
            password: password ? undefined : 'Please provide password',
        })
    }
    const user = await User.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid credentials', {
            email: 'Email not registered account',
        })
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid credentials', {
            password: 'Password is incorrect',
        })
    }
    let refreshToken = ''
    const isTokenExist = await Token.findOne({
        where: {
            userId: user.id,
            deletedAt: null,
        },
    })
    if (isTokenExist) {
        const { isValid } = isTokenExist
        if (!isValid) {
            throw new CustomError.UnauthenticatedError('Invalid Credentials')
        }
        refreshToken = isTokenExist.refreshToken
    } else {
        refreshToken = crypto.randomBytes(50).toString('hex')
        const userAgent = req.headers['user-agent']
        const ip = req.ip
        await Token.create({
            refreshToken,
            ip,
            userAgent,
            userId: user.id,
        })
    }
    const tokenUser = createTokenUser(user)
    const accessTokenJWT = createJWT({
        payload: { user: tokenUser },
    })
    const refreshTokenJWT = createJWT({
        payload: { user: tokenUser, refreshToken },
    })
    res.status(StatusCodes.OK).json({
        message: 'Login successfully',
        data: {
            user: tokenUser,
            accessToken: accessTokenJWT,
            refreshToken: refreshTokenJWT,
        },
    })
}

const logout = async (req, res) => {
    await Token.destroy({
        where: {
            userId: req.user.id,
            deletedAt: null,
        },
    })
    res.json({
        message: 'User logged out...',
        data: {},
    })
}

module.exports = {
    register,
    login,
    logout,
}
