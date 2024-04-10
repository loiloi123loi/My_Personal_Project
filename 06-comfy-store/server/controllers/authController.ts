import { Request, Response } from 'express'
import CustomError from '../errors'
import { StatusCodes } from 'http-status-codes'
import { User } from '../models'
import { createJWT, createTokenUser } from '../utils'
import crypto from 'crypto'

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        throw new CustomError.BadRequestError('Please provide all fieldss')
    }
    const isEmailExist = await User.findOne({
        email,
    })
    if (isEmailExist) {
        throw new CustomError.BadRequestError('Email already exist')
    }
    await User.create({
        username,
        email,
        password,
    })
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: {
            message: 'Register successfully',
        },
    })
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    const user = await User.findOne({
        email,
    })
    if (!user) {
        throw new CustomError.UnauthenticatedError('Email is invalid')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Password incorrect')
    }
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
            jwt: jwtToken,
            user: token,
        },
    })
}

export { register, login }
