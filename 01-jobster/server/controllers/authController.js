const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createJWT } = require('../utils')

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new CustomError.BadRequestError('Please provide both values')
    }
    const user = await User.create({ ...req.body })
    const token = await createJWT(user)
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token,
        },
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide both values')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const token = await createJWT(user)
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token,
        },
    })
}

const updateUser = async (req, res) => {
    const { name, email } = req.body
    if (!name || !email) {
        throw new CustomError.BadRequestError('Please provide all values')
    }
    const user = await User.findOneAndUpdate({ _id: req.user.id }, req.body, {
        new: true,
        runValidators: true,
    })
    const token = await createJWT(user)
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token,
        },
    })
}

module.exports = {
    register,
    login,
    updateUser,
}
