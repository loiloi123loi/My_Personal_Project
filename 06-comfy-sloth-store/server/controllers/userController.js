const { StatusCodes } = require('http-status-codes')
const { User } = require('../models')
const CustomError = require('../errors')
const { createTokenUser, checkPermissions } = require('../utils')

const getAllUsers = async (req, res) => {
    const users = await User.findAll({
        where: {
            role: 'user',
        },
        attributes: {
            exclude: ['password', 'updatedAt', 'deletedAt'],
        },
    })
    res.status(StatusCodes.OK).json({
        message: 'Get all users successfully',
        data: {
            users,
        },
    })
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({
        message: 'Get successfully',
        data: {
            user: req.user,
        },
    })
}

const updateUser = async (req, res) => {}

const updateUserPassword = async (req, res) => {}

module.exports = {
    getAllUsers,
    showCurrentUser,
    updateUser,
    updateUserPassword,
}
