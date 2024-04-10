import mongoose, { Document, Schema } from 'mongoose'

interface IReviewDocument extends Document {
    rating: number
    title: string
    comment: string
    user: mongoose.Types.ObjectId
    product: number
    order: mongoose.Types.ObjectId
}

export interface IReview extends IReviewDocument {}

const ReviewSchema = new Schema<IReview>(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, 'Please provide rating'],
        },
        comment: {
            type: String,
            required: [true, 'Please provide review text'],
            maxlength: 50,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: Number,
            ref: 'Product',
            required: true,
        },
        order: {
            type: mongoose.Schema.ObjectId,
            ref: 'Order',
            required: true,
        },
    },
    { timestamps: true }
)

const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema)

export default ReviewModel
