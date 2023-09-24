const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Not email format',
        },
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 5,
    },
    lastName: {
        type: String,
        default: 'last name',
        minlength: 3,
        maxlength: 20,
    },
    location: {
        type: String,
        default: 'my city',
        minlength: 3,
        maxlength: 20,
    },
})

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

UserSchema.methods.comparePassword = async function (passCompare) {
    const isMatched = await bcrypt.compare(passCompare, this.password)
    return isMatched
}

module.exports = mongoose.model('User', UserSchema)
