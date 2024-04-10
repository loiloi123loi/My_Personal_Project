import mongoose, { Document, Schema } from 'mongoose'
import validator from 'validator'

export interface IOrderAddress extends Document {
    user: mongoose.Types.ObjectId
    recipientName: String
    phone: String
    province: String
    district: String
    commune: String
    address: String
}

const OrderAddressSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    recipientName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (value: any) => {
                return validator.isMobilePhone(value)
            },
        },
    },
    province: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    commune: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
})

export default mongoose.model('OrderAddress', OrderAddressSchema)
