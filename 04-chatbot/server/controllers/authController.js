const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { User, Token } = require('../models')
const crypto = require('crypto')
const {
    createTokenUser,
    attachCookiesToResponse,
    sendVerifycationEmail,
    sendResetPasswordEmail,
    createHash,
    passport,
} = require('../utils')
const validator = require('validator')

const registerLocal = async (req, res) => {
    const { firstName, lastName, username, email, password, repeatPassword } =
        req.body
    if (
        !firstName ||
        !lastName ||
        !email ||
        !username ||
        !password ||
        !repeatPassword
    ) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    if (password !== repeatPassword) {
        throw new CustomError.BadRequestError(
            'Repeat password not same with password'
        )
    }
    const isUsernameExits = await User.findOne({ username })
    if (isUsernameExits) {
        throw new CustomError.BadRequestError(
            'Username is used, please try one more'
        )
    }
    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
        throw new CustomError.BadRequestError(
            'Email is used, please try one more'
        )
    }
    const isFirstUser = (await User.count()) === 0
    const role = isFirstUser ? 'admin' : 'user'
    const verifycationToken = crypto.randomBytes(50).toString('hex')
    const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        role,
        verifycationToken,
    })
    const origin = process.env.FRONT_END_LINK
    await sendVerifycationEmail({
        name: user.fullName,
        email,
        verifycationToken,
        origin,
    })
    res.status(StatusCodes.CREATED).json({
        msg: 'Please comfirm your email to verify',
    })
}

const callPassportGoogle = () => {
    passport.authenticate('google', ['profile', 'email'])
}

const registerGoogle = async (req, res) => {}

const registerFacebook = async (req, res) => {}

const verifyEmail = async (req, res) => {
    const { verifycationToken, email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.UnAuthorizedError('Verification failed')
    }
    if (user.isVerified === true) {
        throw new CustomError.BadRequestError('Your account is verified')
    }
    if (user.verifycationToken !== verifycationToken) {
        throw new CustomError.UnAuthorizedError('Verification failed')
    }
    user.isVerified = true
    user.verified = Date.now()
    user.verifycationToken = null
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Email verified' })
}

const loginLocal = async (req, res) => {
    const { usernameOrEmail, password } = req.body
    if (!usernameOrEmail || !password) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    let user
    if (validator.isEmail(usernameOrEmail)) {
        const email = usernameOrEmail
        user = await User.findOne({ email })
    } else {
        const username = usernameOrEmail
        user = await User.findOne({ username })
    }
    if (!user) {
        throw new CustomError.NotFoundError(
            'This email does not exist on the system yet, \
                please go to the registration page or check again'
        )
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnAuthorizedError('Wrong password')
    }
    if (!user.isVerified) {
        throw new CustomError.UnAuthorizedError(
            'Please verify your email to continue'
        )
    }
    const tokenUser = createTokenUser(user)
    let refreshToken = ''
    const isTokenExist = await Token.findOne({ userId: user.id })
    if (isTokenExist) {
        const { isValid } = isTokenExist
        if (!isValid) {
            throw new CustomError.UnAuthorizedError('Invalid Credentials')
        }
        refreshToken = isTokenExist.refreshToken
        attachCookiesToResponse({ res, user: tokenUser, refreshToken })
        res.status(StatusCodes.OK).json({ user: tokenUser })
        return
    }
    refreshToken = crypto.randomBytes(50).toString('hex')
    const userAgent = req.headers['user-agent']
    const ip = req.ip
    const token = await Token.create({
        refreshToken,
        ip,
        userAgent,
        userId: user.id,
    })
    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const loginGoogle = async (req, res) => {
    passport.authenticate('google', ['profile', 'email'])
}

const loginFacebook = async (req, res) => {}

const logout = async (req, res) => {
    await Token.destroy({
        where: {
            userId: req.user.id,
        },
        limit: 1,
    })
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(200).json({ msg: 'User logged out !!' })
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    if (!email || !validator.isEmail(email)) {
        throw new CustomError.BadRequestError('Please provide valid email')
    }
    const user = await User.findOne({ email })
    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex')
        const origin = process.env.FRONT_END_LINK
        await sendResetPasswordEmail({
            name: user.fullName,
            email: user.email,
            token: passwordToken,
            origin,
        })
        const tenMinutes = 1000 * 60 * 10
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)
        user.passwordToken = createHash(passwordToken)
        user.passwordTokenExpirationDate = passwordTokenExpirationDate
        await user.save()
    }
    res.status(StatusCodes.CREATED).json({
        msg: 'Please check your email for reset password link',
    })
}

const resetPassword = async (req, res) => {
    const { email, token, password } = req.body
    if (!email || !token || !password) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    const user = await User.findOne({ email })
    if (user) {
        const currentDate = Date.now()
        const dateExpire = new Date(user.passwordTokenExpirationDate).getTime()
        if (
            user.passwordToken === createHash(token) &&
            dateExpire > currentDate
        ) {
            user.password = password
            user.passwordToken = null
            user.passwordTokenExpirationDate = null
            await user.save()
        }
    }
    res.status(StatusCodes.OK).json({ msg: 'Reset password successfully' })
}

module.exports = {
    registerLocal,
    callPassportGoogle,
    registerGoogle,
    registerFacebook,
    verifyEmail,
    loginLocal,
    loginGoogle,
    loginFacebook,
    logout,
    resetPassword,
    forgotPassword,
}
