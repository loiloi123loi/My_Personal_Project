import { Request, Response } from 'express'
import CustomError from '../errors'
import { StatusCodes } from 'http-status-codes'
import { Product, Review } from '../models'
import mongoose from 'mongoose'

const getAllReviewProduct = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError('Authenticate invalid')
    }
    const productId = Number.parseInt(req.params.productId)
    console.log(productId)
    res.json('all')
}

const createReviewProduct = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError('Authenticate invalid')
    }
    const productId = Number.parseInt(req.params.productId)
    const { orderId, comment } = req.body
    const rating = Number.parseInt(req.body.rating)
    if (!mongoose.isValidObjectId(orderId)) {
        throw new CustomError.BadRequestError(`No order with id ${orderId}`)
    }
    if (isNaN(rating) || rating <= 0 || rating > 5) {
        throw new CustomError.BadRequestError('Please provide valid rating')
    }
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const product = await Product.findOne({
            _id: productId,
        }).session(session)
        if (!product) {
            throw new CustomError.BadRequestError(
                `No product with id ${productId}`
            )
        }
        let review = await Review.findOne({
            order: orderId,
            user: req.user.id,
            product: productId,
        }).session(session)
        if (review) {
            throw new CustomError.BadRequestError(
                `You have placed this order already`
            )
        }
        review = new Review({
            rating,
            comment,
            order: orderId,
            user: req.user.id,
            product: productId,
        })
        product.averageRating =
            (product.averageRating * product.numOfReviews + rating) /
            (product.numOfReviews + 1)
        product.numOfReviews++
        await Promise.all([review.save({ session }), product.save({ session })])
        await session.commitTransaction()
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: {
                review,
            },
        })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        if (!(err instanceof CustomError.CustomAPIError)) {
            await new Promise((resolve) =>
                setTimeout(resolve, Math.floor(Math.random() * 1000))
            )
            await createReviewProduct(req, res)
        } else {
            throw err
        }
    }
}

export { getAllReviewProduct, createReviewProduct }
