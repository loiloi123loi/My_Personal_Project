import mongoose, { Document, Schema } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

interface IUserDocument extends Document {
    _id: mongoose.Types.ObjectId
    username: string
    email: string
    password: string
    role: string
}

export interface IUser extends IUserDocument {
    comparePassword: (passCompare: string) => Promise<boolean>
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Please provide username'],
        },
        email: {
            type: String,
            required: [true, 'Please provide email'],
            minlength: 5,
            maxlength: 30,
            unique: true,
            validate: {
                validator: function (e: String) {
                    return validator.isEmail(e.toString())
                },
                message: 'Please provide valid email',
            },
        },
        password: {
            type: String,
            minlength: 5,
            required: [true, 'Please provide password'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    }
)
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.comparePassword = async function (passCompare: string) {
    const isMatch = await bcrypt.compare(passCompare, this.password)
    return isMatch
}

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel
