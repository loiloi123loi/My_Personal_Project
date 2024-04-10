import { Request, Response } from 'express'
import CustomError from '../errors'
import { StatusCodes } from 'http-status-codes'
import { Cart, Product } from '../models'
import { ICartItem } from '../models/Cart'

const getCart = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError(`Authentication invalid`)
    }
    let cart = await Cart.findOne({
        user: req.user?.id,
    })
    if (!cart) {
        cart = await Cart.create({
            user: req.user?.id,
        })
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            cart,
        },
    })
}

const addProductToCart = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError(`Authentication invalid`)
    }
    let cart = await Cart.findOne({
        user: req.user.id,
    })
    if (!cart) {
        cart = await Cart.create({
            user: req.user.id,
        })
    }
    const { productId, quantity } = req.body
    if (!productId || !quantity || quantity <= 0) {
        throw new CustomError.BadRequestError(
            'Please provide invalid product id and product quantity'
        )
    }
    const product = await Product.findOne({
        _id: productId,
    })
    if (!product) {
        throw new CustomError.BadRequestError(`No product with id ${productId}`)
    }
    if (product.inventory === 0) {
        throw new CustomError.BadRequestError(
            `Product id ${productId} is out of stock`
        )
    }
    const cartItem = cart.cartItems.find((item) => item.product === productId)
    if (!cartItem) {
        cart.cartItems.push({
            product: productId,
            quantity,
        } as ICartItem)
    } else {
        if (product.inventory < cartItem.quantity + quantity) {
            throw new CustomError.BadRequestError(
                `Insufficient products in stock`
            )
        }
        cartItem.quantity += quantity
    }
    await cart.save()
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            cart,
        },
    })
}

const updateCart = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError(`Authentication invalid`)
    }
    let cart = await Cart.findOne({
        user: req.user.id,
    })
    if (!cart) {
        cart = await Cart.create({
            user: req.user.id,
        })
    }
    const productId = Number.parseInt(req.params.productId)
    const quantity = Number.parseInt(req.body.quantity)
    const product = await Product.findOne({
        _id: productId,
    })
    if (!product) {
        throw new CustomError.BadRequestError(`No product with id ${productId}`)
    }
    if (quantity <= 0) {
        throw new CustomError.BadRequestError(
            `Please provide invalid product quantity`
        )
    }
    if (quantity > product.inventory) {
        throw new CustomError.BadRequestError(
            `Product id ${productId} is out of stock`
        )
    }
    const cartItem = cart.cartItems.find((item) => item.product === productId)
    if (!cartItem) {
        cart.cartItems.push({
            product: productId,
            quantity,
        } as ICartItem)
    } else {
        cartItem.quantity = quantity
    }
    await cart.save()
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            cart,
        },
    })
}

const deleteProductInCart = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        throw new CustomError.UnauthenticatedError(`Authentication invalid`)
    }
    let cart = await Cart.findOne({
        user: req.user.id,
    })
    if (cart) {
        const productId = Number.parseInt(req.params.productId)
        cart.cartItems = cart.cartItems.filter(
            (item) => item.product !== productId
        ) as [ICartItem]
        await cart.save()
    }
    cart = await Cart.create({
        user: req.user.id,
    })
    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            cart,
        },
    })
}

export { getCart, addProductToCart, updateCart, deleteProductInCart }
