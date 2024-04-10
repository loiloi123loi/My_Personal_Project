import { Express } from 'express'
import { authenticationMiddle } from '../middlewares'
import authRouter from './authRouter'
import userRouter from './userRouter'
import productRouter from './productRouter'
import cartRouter from './cartRouter'
import orderRouter from './orderRouter'
import orderAddressRouter from './orderAddressRouter'
import reviewRouter from './reviewRouter'

export default function (app: Express) {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', authenticationMiddle, userRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/cart', authenticationMiddle, cartRouter)
    app.use('/api/v1/order', authenticationMiddle, orderRouter)
    app.use('/api/v1/order-address', authenticationMiddle, orderAddressRouter)
    app.use('/api/v1/review', authenticationMiddle, reviewRouter)
}
