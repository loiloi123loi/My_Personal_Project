import { Request, Response } from 'express'
import CustomError from '../errors'
import { StatusCodes } from 'http-status-codes'
import { User } from '../models'
import { createJWT, createTokenUser } from '../utils'
import crypto from 'crypto'

const getAllUser = async (req: Request, res: Response) => {
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            users,
        },
    })
}

const getSingleUser = async (req: Request, res: Response) => {
    const user = await User.findOne({
        _id: req.params.id,
    }).select('-password')
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            user,
        },
    })
}

const showCurrentUser = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            user: req.user,
        },
    })
}

const updateUser = async (req: Request, res: Response) => {
    const { username, email } = req.body
    if (!username || !email) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    const user = await User.findOne({
        _id: req.user?.id,
    })
    if (!user) {
        throw new CustomError.BadRequestError(
            `No user with id: ${req.user?.id}`
        )
    }
    user.username = username
    user.email = email
    await user.save()
    const token = createTokenUser(user)
    const jwt = crypto.randomBytes(40).toString('hex')
    const jwtToken = createJWT({
        payload: {
            jwt,
            token,
        },
    })
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            message: 'Update information successfully',
            jwt: jwtToken,
            user: token,
        },
    })
}

const updateUserPassword = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    const user = await User.findOne({
        _id: req.user?.id,
    })
    if (!user) {
        throw new CustomError.UnauthenticatedError(
            `No user with id: ${req.user?.id}`
        )
    }
    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid credentials')
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            message: 'Update password successfully',
        },
    })
}

export {
    getAllUser,
    getSingleUser,
    updateUser,
    showCurrentUser,
    updateUserPassword,
}
