const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { User, History } = require('../models')
const validator = require('validator')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const {
    attachCookiesToResponse,
    checkPermission,
    createTokenUser,
} = require('../utils')

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
        where: { id },
    })
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id ${id}`)
    }
    checkPermission(req.user, user.id)
    const userToken = createTokenUser(user)
    res.status(StatusCodes.OK).json({ user: userToken })
}

const updateProfile = async (req, res) => {
    const { firstName, lastName, phone } = req.body
    if (!firstName || !lastName || !phone) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    const user = await User.findOne({
        email: req.user.email,
        id: req.user.id,
    })
    if (!user) {
        throw new CustomError.UnAuthorizedError('Authentication Fail')
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
    user.firstName = firstName
    user.lastName = lastName
    user.phone = phone
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Update user successfull' })
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    const user = await User.findOne({
        email: req.user.email,
        id: req.user.id,
    })
    const isCorrectPassword = await user.comparePassword(oldPassword)
    if (!isCorrectPassword) {
        throw new CustomError.UnAuthorizedError('Invalid Credentials')
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Password update successfull' })
}

module.exports = {
    getSingleUser,
    currentUser,
    updateProfile,
    updateUserPassword,
}
