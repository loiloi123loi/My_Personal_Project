const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const User = require('../models/User')
const Token = require('../models/Token')
const crypto = require('crypto')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const {
    sendVerifycationEmail,
    createTokenUser,
    attachCookiesToResponse,
    createHash,
    sendResetPasswordEmail,
} = require('../utils')

const register = async (req, res) => {
    const { name, lastName, location, email, password } = req.body
    const isExistEmail = await User.findOne({ email })
    if (isExistEmail) {
        throw new CustomError.BadRequestError(`Email already exist`)
    }
    const isFirstUser = (await User.find({})).length === 0
    const role = isFirstUser ? 'admin' : 'user'
    const verifycationToken = crypto.randomBytes(50).toString('hex')
    const user = await User.create({
        name,
        lastName,
        location,
        email,
        password,
        role,
        verifycationToken,
    })
    const origin = process.env.FRONT_URL
    await sendVerifycationEmail({
        name: user.username,
        email: user.email,
        verifycationToken,
        origin,
    })
    res.status(StatusCodes.CREATED).json({
        msg: 'Please comfirm your email to verify',
    })
}

const verifyEmail = async (req, res) => {
    const { token: verifycationToken, email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.NotFoundError(`Verification failed`)
    }
    if (user.verifycationToken !== verifycationToken) {
        throw new CustomError.NotFoundError(`Verification failed`)
    }
    user.isVerified = true
    user.verified = Date.now()
    user.verifycationToken = ''
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Email verified' })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new CustomError.BadRequestError(`Please provide all values`)
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.UnAuthenticatedError(`Invalid Credentials`)
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnAuthenticatedError(`Invalid Credentials`)
    }
    if (!user.isVerified) {
        throw new CustomError.UnAuthenticatedError(`Please verified your email`)
    }
    const tokenUser = createTokenUser(user)
    let refreshToken = ''
    const existToken = await Token.findOne({ user: user._id })
    if (existToken) {
        const { isValid } = existToken
        if (!isValid) {
            throw new CustomError.UnAuthenticatedError(`Invalid Credentials`)
        }
        refreshToken = existToken.refreshToken
        attachCookiesToResponse({ res, user: tokenUser, refreshToken })
        res.status(StatusCodes.OK).json({ user: tokenUser })
        return
    }
    refreshToken = crypto.randomBytes(50).toString('hex')
    const userAgent = req.headers['user-agent']
    const ip = req.ip
    const userToken = { refreshToken, ip, userAgent, user: user._id }
    await Token.create(userToken)
    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
    await Token.findOneAndDelete({ user: req.user.id })
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: 'User logged out!' })
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new CustomError.BadRequestError(`Please provide valid email`)
    }
    const user = await User.findOne({ email })
    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex')
        const origin = process.env.FRONT_URL
        await sendResetPasswordEmail({
            name: user.username,
            email: user.email,
            token: passwordToken,
            origin,
        })
        const tenminutes = 10 * 60 * 1000
        const passwordTokenExpirationDate = new Date(Date.now() + tenminutes)
        user.passwordToken = createHash(passwordToken)
        user.passwordTokenExpirationDate = passwordTokenExpirationDate
        await user.save()
    }
    res.status(StatusCodes.CREATED).json({
        msg: 'Please comfirm your email for reset password',
    })
}

const resetPassword = async (req, res) => {
    const { token, email, passwordNew, passwordConfirm } = req.body
    if (!token || !email || !passwordNew || !passwordConfirm) {
        throw new CustomError.BadRequestError(`Please provide all values`)
    }
    if (passwordNew !== passwordConfirm) {
        throw new CustomError.BadRequestError(
            `new password and confirm password not same`
        )
    }
    const user = await User.findOne({ email })
    if (user) {
        const currentDate = new Date()
        if (
            user.passwordToken === createHash(token) &&
            user.passwordTokenExpirationDate > currentDate
        ) {
            user.password = passwordNew
            user.passwordToken = null
            user.passwordTokenExpirationDate = null
            await user.save()
        }
    }
    res.status(StatusCodes.OK).json({ msg: 'password reset success' })
}

const updateUser = async (req, res) => {
    const { name, lastName, location } = req.body
    if (!name) {
        throw new CustomError.BadRequestError(`Please provide name`)
    }
    if (req.user.isTestUser) {
        throw new CustomError.UnAuthenticatedError('Test user is read only')
    }
    const user = await User.findOne({
        _id: req.user.id,
        email: req.user.email,
    })
    if (!user) {
        throw CustomError.UnAuthenticatedError(`Authentication Failed`)
    }
    if (req.files) {
        const file = req.files.file
        if (!file.mimetype.startsWith('image')) {
            throw new CustomError.BadRequestError(`Please upload image`)
        }
        const maxsize = 512 * 1024
        if (file.size > maxsize) {
            throw new CustomError.BadRequestError(
                `Please upload file smaller than 0.5MB`
            )
        }
        if (user.avatar) {
            await cloudinary.api.delete_resources(user.avatar_public_id, {
                type: 'upload',
                resource_type: 'image',
            })
        }
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            use_filename: true,
            folder: 'avatar',
            quality: 60,
        })
        fs.unlinkSync(file.tempFilePath)
        user.avatar = result.secure_url
        user.avatar_public_id = result.public_id
    }
    user.name = name
    user.lastName = lastName
    user.location = location
    user.save()
    res.status(StatusCodes.OK).json({ msg: 'Update user successfull' })
}

const currentUser = async (req, res) => {
    const user = await User.findOne({
        _id: req.user.id,
        email: req.user.email,
    })
    if (!user) {
        throw new CustomError.UnAuthenticatedError(`Authorzation failed`)
    }
    const tokenUser = createTokenUser(user)
    res.status(StatusCodes.OK).json({
        user: tokenUser,
    })
}

module.exports = {
    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateUser,
    currentUser,
}
