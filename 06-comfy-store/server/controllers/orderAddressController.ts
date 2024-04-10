import { Request, Response } from 'express'
import CustomError from '../errors'
import { StatusCodes } from 'http-status-codes'
import { OrderAddress } from '../models'
import mongoose from 'mongoose'

const getAllOrderAddress = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError('Authenticate Invalid')
    }
    const orderAddresses = await OrderAddress.find({
        user: req.user.id,
    })
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            orderAddresses,
        },
    })
}

const createOrderAddress = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError('Authenticate Invalid')
    }
    const { recipientName, phone, province, district, commune, address } =
        req.body
    if (
        !recipientName ||
        !phone ||
        !province ||
        !district ||
        !commune ||
        !address
    ) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    const orderAddress = await OrderAddress.create({
        user: req.user.id,
        recipientName,
        phone,
        province,
        district,
        commune,
        address,
    })
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: {
            orderAddress,
        },
    })
}

const getSingleOrderAddress = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError('Authenticate Invalid')
    }
    const { id: orderAddressId } = req.params
    if (!mongoose.isValidObjectId(orderAddressId)) {
        throw new CustomError.NotFoundError(
            `No order address with id ${orderAddressId}`
        )
    }
    const orderAddress = await OrderAddress.findOne({
        _id: orderAddressId,
        user: req.user.id,
    })
    if (!orderAddress) {
        throw new CustomError.NotFoundError(
            `No order address with id ${orderAddressId}`
        )
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            orderAddress,
        },
    })
}

const changeInfoOrderAddress = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError('Authenticate Invalid')
    }
    const { id: orderAddressId } = req.params
    if (!mongoose.isValidObjectId(orderAddressId)) {
        throw new CustomError.NotFoundError(
            `No order address with id ${orderAddressId}`
        )
    }
    const { recipientName, phone, province, district, commune, address } =
        req.body
    const orderAddress = await OrderAddress.findOne({
        _id: orderAddressId,
        user: req.user.id,
    })
    if (!orderAddress) {
        throw new CustomError.NotFoundError(
            `No order address with id ${orderAddressId}`
        )
    }
    orderAddress.recipientName = recipientName
    orderAddress.phone = phone
    orderAddress.province = province
    orderAddress.district = district
    orderAddress.commune = commune
    orderAddress.address = address
    await orderAddress.save()
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            orderAddress,
        },
    })
}

const deleteOrderAddress = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError('Authenticate Invalid')
    }
    const { id: orderAddressId } = req.params
    if (!mongoose.isValidObjectId(orderAddressId)) {
        throw new CustomError.NotFoundError(
            `No order address with id ${orderAddressId}`
        )
    }
    const orderAddress = await OrderAddress.findOneAndDelete({
        _id: orderAddressId,
        user: req.user.id,
    })
    if (!orderAddress) {
        throw new CustomError.NotFoundError(
            `No order address with id ${orderAddressId}`
        )
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: {},
    })
}

export {
    getAllOrderAddress,
    createOrderAddress,
    getSingleOrderAddress,
    changeInfoOrderAddress,
    deleteOrderAddress,
}
