import mongoose, { Document, Schema } from 'mongoose'
import CounterModel from './Counter'

interface IProductDocument extends Document {
    _id: number
    name: string
    price: number
    description: string
    image: string
    category: string
    company: string
    colors: string[]
    featured: boolean
    freeShipping: boolean
    inventory: number
    averageRating: number
    numOfReviews: number
    user: mongoose.Types.ObjectId
}

export interface IProduct extends IProductDocument {}

const ProductSchema = new Schema<IProduct>(
    {
        _id: { type: Number },
        name: {
            type: String,
            trim: true,
            required: [true, 'Please provide product name'],
            maxlength: [100, 'Name can not be more than 100 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide product price'],
            default: 0,
        },
        description: {
            type: String,
            required: [true, 'Please provide product description'],
            maxlength: [
                1000,
                'Description can not be more than 1000 characters',
            ],
        },
        image: {
            type: String,
            default: '/uploads/example.jpeg',
        },
        category: {
            type: String,
            required: [true, 'Please provide product category'],
            enum: ['Tables', 'Chairs', 'Kids', 'Sofas', 'Beds'],
        },
        company: {
            type: String,
            required: [true, 'Please provide company'],
            enum: {
                values: [
                    'Modenza',
                    'Luxora',
                    'Artifex',
                    'Comfora',
                    'Homestead',
                ],
                message: '{VALUE} is not supported',
            },
        },
        colors: {
            type: [String],
            default: ['#222'],
            required: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        freeShipping: {
            type: Boolean,
            default: false,
        },
        inventory: {
            type: Number,
            required: true,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        id: false,
    }
)
ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
})
ProductSchema.pre('save', function (next) {
    let doc = this
    if (!doc.isNew) {
        return next()
    }
    CounterModel.findByIdAndUpdate(
        { _id: 'product' },
        { $inc: { seq: 1 } },
        { new: true }
    )
        .then(function (count) {
            if (count) {
                doc._id = count.seq
            }
            next()
        })
        .catch(function (error) {
            throw error
        })
})
ProductSchema.pre('deleteOne', async function (next) {
    await mongoose.model('Review').deleteMany({ product: this.getQuery()._id })
    next()
})

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema)

export default ProductModel
