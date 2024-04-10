import mongoose, { Document, Schema } from 'mongoose'

export interface ICartItem extends Document {
    product: number
    quantity: number
}

const CartItemSchema = new Schema<ICartItem>(
    {
        product: {
            type: Number,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

export interface ICart extends Document {
    cartItems: [ICartItem]
    user: mongoose.Types.ObjectId
}

const CartSchema = new Schema<ICart>(
    {
        cartItems: [CartItemSchema],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

const CartModel = mongoose.model<ICart>('Cart', CartSchema)

export default CartModel
