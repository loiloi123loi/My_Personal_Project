const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { User, History } = require('../models')
const {
    attachCookiesToResponse,
    checkPermission,
    createTokenUser,
} = require('../utils')

const getAllUsers = async (req, res) => {
    const user = await User.findAll({
        attributes: [
            'id',
            'firstName',
            'lastName',
            'fullName',
            'username',
            'email',
            'phone',
            'avatar',
            'role',
        ],
    })
    res.status(StatusCodes.OK).json({ data: user })
}

const getSingleUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findOne({
        attributes: [
            'id',
            'firstName',
            'lastName',
            'fullName',
            'username',
            'email',
            'phone',
            'avatar',
            'role',
        ],
        where: { id },
    })
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id ${id}`)
    }
    checkPermission(req.user, user.id)
    res.status(StatusCodes.OK).json({ msg: user })
}

const currentUser = async (req, res) => {
    const { id } = req.user
    const user = await User.findOne({
        attributes: [
            'id',
            'firstName',
            'lastName',
            'fullName',
            'username',
            'email',
            'phone',
            'avatar',
            'role',
        ],
        where: { id },
    })
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id ${id}`)
    }
    checkPermission(req.user, user.id)
    res.status(StatusCodes.OK).json({ msg: user })
}

const updateProfile = async (req, res) => {}

const updateUserPassword = async (req, res) => {}

module.exports = {
    getAllUsers,
    getSingleUser,
    currentUser,
    updateProfile,
    updateUserPassword,
}
