const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const User = require('../models/User')
const { createTokenUser } = require('../utils')

const currentUser = async (req, res) => {
    const { id } = req.user
    const user = await User.findOne({
        _id: id,
    })
    if (!user) {
        throw new CustomError.BadRequestError('Invalid credentials')
    }
    const token = createTokenUser(user)
    res.status(StatusCodes.OK).json({ user: token })
}

module.exports = {
    currentUser,
}
