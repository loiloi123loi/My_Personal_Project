const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name'],
        minlength: 3,
        maxlength: 50,
    },
    location: {
        type: String,
        required: [true, 'Please provide last location'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        require: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    avatar: { type: String },
    avatar_public_id: { type: String },
    verifycationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    verified: { type: Date },
    passwordToken: { type: String },
    passwordTokenExpirationDate: { type: Date },
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (passCompare) {
    const isMatch = await bcrypt.compare(passCompare, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)
