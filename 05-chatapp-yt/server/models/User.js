const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true],
        },
        username: {
            type: String,
            required: [true],
            unique: true,
        },
        password: {
            type: String,
            required: [true],
            minlength: 6,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female'],
        },
        profilePic: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
)
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
