const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const User = require('../models/User')
const Job = require('../models/Job')

const getInfo = async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new CustomError.UnAuthenticatedError('User can not access here')
    }
    const countUsers = await User.countDocuments({ isVerified: true })
    const countJobs = await Job.countDocuments({})
    res.status(StatusCodes.OK).json({ users: countUsers, jobs: countJobs })
}

module.exports = {
    getInfo,
}
