import { Request, Response } from 'express'
import CustomError from '../errors'
import { StatusCodes } from 'http-status-codes'
import { Product, Order, OrderAddress } from '../models'
import mongoose from 'mongoose'

const createOrder = async (req: Request, res: Response) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        if (!req.user?.id) {
            throw new CustomError.UnauthenticatedError('Authenticate invalid')
        }
        const { orderItems, orderAddress } = req.body
        if (!mongoose.isValidObjectId(orderAddress)) {
            throw new CustomError.BadRequestError(
                `No order address with id ${orderAddress}`
            )
        }
        const orderAddressChoosen = await OrderAddress.findOne({
            _id: orderAddress,
        }).session(session)
        if (!orderAddressChoosen) {
            throw new CustomError.BadRequestError(
                `No order address with id ${orderAddress}`
            )
        }
        let subTotal = 0
        let shippingFee = 0
        let arr: any = []
        for (const item of orderItems) {
            let product = await Product.findOne({
                _id: item.product,
            }).session(session)
            if (!product || product.inventory <= 0) {
                break
            }
            subTotal += product.price * item.amount
            shippingFee += product.freeShipping ? 0 : 5
            product.inventory -= item.amount
            await product.save()
            arr.push(item)
        }
        let tax = parseFloat((subTotal * 0.1).toFixed(2))
        let total = parseFloat((subTotal + shippingFee + tax).toFixed(2))
        if (arr.length < orderItems.length) {
            throw new CustomError.BadRequestError('Product out of stock')
        }
        const order = await Order.create(
            [
                {
                    tax,
                    shippingFee,
                    subTotal,
                    total,
                    orderItems: arr,
                    user: req.user.id,
                    orderAddress,
                },
            ],
            { session }
        )
        await session.commitTransaction()
        session.endSession()
        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                order,
            },
        })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        if (!(err instanceof CustomError.CustomAPIError)) {
            await new Promise((resolve) =>
                setTimeout(resolve, Math.floor(Math.random() * 1000))
            )
            await createOrder(req, res)
        } else {
            throw err
        }
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError('Authenticate invalid')
    }
    const orders = await Order.find({
        user: req.user.id,
    })
    res.json(orders)
}

const detailOrder = async (req: Request, res: Response) => {}

export { createOrder, getAllOrders, detailOrder }
