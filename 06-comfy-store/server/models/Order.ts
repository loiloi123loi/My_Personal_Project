import mongoose, { Document, Schema } from 'mongoose'

export interface IOrder extends Document {
    tax: number
    shippingFee: number
    subTotal: number
    total: number
    status: string
    orderItems: []
    user: mongoose.Types.ObjectId
    orderAddress: mongoose.Types.ObjectId
    note: string
}

export interface ISingleItem extends Document {
    amount: number
    product: number
}

const SingleOrderItemSchema = new Schema<ISingleItem>(
    {
        amount: { type: Number, required: true },
        product: { type: Number, ref: 'Product', required: true },
    },
    { _id: false }
)

const OrderSchema = new Schema<IOrder>(
    {
        tax: { type: Number, required: true },
        shippingFee: { type: Number, required: true },
        subTotal: { type: Number, required: true },
        total: { type: Number, required: true },
        orderItems: [SingleOrderItemSchema],
        status: {
            type: String,
            enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
            default: 'pending',
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        orderAddress: {
            type: mongoose.Schema.ObjectId,
            ref: 'OrderAddress',
            required: true,
        },
        note: { type: String },
    },
    { timestamps: true }
)

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema)

export default OrderModel
