const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const User = require('../models/User')
const { createTokenUser, attachCookiesToResponse } = require('../utils')
const { io } = require('../socket.io')

const register = async (req, res) => {
    const { fullName, username, password, confirmPassword, gender } = req.body
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    if (password !== confirmPassword) {
        throw new CustomError.BadRequestError(
            'Password and confirm password not match'
        )
    }
    const isExist = await User.findOne({
        username,
    })
    if (isExist) {
        throw new CustomError.BadRequestError('Username already exists')
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
    const user = await User.create({
        fullName,
        username,
        password,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    })
    const token = createTokenUser(user)
    attachCookiesToResponse({ res, user: token })
    delete user.password
    io.emit('newConversation', user)
    res.status(StatusCodes.CREATED).json({
        user: token,
    })
}

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    const user = await User.findOne({
        username,
    })
    if (!user) {
        throw new CustomError.UnauthorizedError('Invalid credentials')
    }
    const isPassTrue = await user.comparePassword(password)
    if (!isPassTrue) {
        throw new CustomError.UnauthorizedError('Invalid credentials')
    }
    const token = createTokenUser(user)
    attachCookiesToResponse({ res, user: token })
    res.status(StatusCodes.OK).json({
        user: token,
    })
}

const logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: 'User logged out!' })
}

module.exports = {
    register,
    login,
    logout,
}
