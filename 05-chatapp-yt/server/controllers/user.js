const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const User = require('../models/User')

const getAllUserOnline = async (req, res) => {
    const { id } = req.user
    const users = await User.find({ _id: { $ne: id } }).select('-password')
    if (!users) {
        throw new CustomError.BadRequestError('Invalid credentials')
    }
    res.status(StatusCodes.OK).json({ users, length: users.length })
}

module.exports = {
    getAllUserOnline,
}
