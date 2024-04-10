import { Request, Response } from 'express'
import CustomError from '../errors'
import { StatusCodes } from 'http-status-codes'
import { Product } from '../models'

const createProduct = async (req: Request, res: Response) => {
    req.body.user = req.user?.id
    const product = await Product.create(req.body)
    if (!product) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            product,
        },
    })
}

const getAllProduct = async (req: Request, res: Response) => {
    const { featured, search, category, company, order, price, shipping } =
        req.query
    const objQuery: {
        featured?: boolean
        name?: any
        search?: string
        category?: string
        company?: string
        price?: any
        freeShipping?: boolean
    } = {}
    if (featured) {
        objQuery.featured = featured.toString().toLowerCase() === 'true'
    }
    if (search) {
        objQuery.name = { $regex: search, $options: 'i' }
    }
    if (category && category !== 'all') {
        objQuery.category = category.toString()
    }
    if (company && company !== 'all') {
        objQuery.company = company.toString()
    }
    if (price) {
        objQuery.price = { $lte: Number(price) }
    }
    if (shipping) {
        objQuery.freeShipping = shipping.toString().toLowerCase() === 'true'
    }
    let result = Product.find(objQuery)
    if (order === 'a-z') {
        result = result.sort('position')
    }
    if (order === 'z-a') {
        result = result.sort('-position')
    }
    if (order === 'lastest') {
        result = result.sort('-createdAt')
    }
    if (order === 'oldest') {
        result = result.sort('createdAt')
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result.skip(skip).limit(limit)
    const products = await result
    const totalProducts = await Product.countDocuments(objQuery)
    const numOfPage = Math.ceil(totalProducts / limit)
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            products,
            meta: {
                page,
                pageSize: limit,
                pageCount: numOfPage,
                total: totalProducts,
            },
        },
    })
}

const getSingleProduct = async (req: Request, res: Response) => {
    const { id: productId } = req.params
    const product = await Product.findOne({
        _id: productId,
    }).populate('reviews')
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            product,
        },
    })
}

const updateProduct = async (req: Request, res: Response) => {
    const { id: productId } = req.params
    const product = await Product.findOneAndUpdate(
        { _id: productId },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            product,
        },
    })
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id: productId } = req.params
    const product = await Product.findOne({
        _id: productId,
    })
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }
    await product.deleteOne()
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            message: 'Success! Product removed.',
        },
    })
}

export {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}
