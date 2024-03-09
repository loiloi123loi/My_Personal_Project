const { StastusCodes, StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const Job = require('../models/Job')
const { default: mongoose } = require('mongoose')

const getAllJobs = async (req, res) => {
    const { status, jobType, sort, search } = req.query
    const objectQuery = {
        createdBy: req.user.id,
    }
    if (search) {
        objectQuery.position = { $regex: search, $options: 'i' }
    }
    if (status && status !== 'all') {
        objectQuery.status = status
    }
    if (jobType && jobType !== 'all') {
        objectQuery.jobType = jobType
    }
    let result = Job.find(objectQuery)
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    if (sort === 'a-z') {
        result = result.sort('position')
    }
    if (sort === 'z-a') {
        result = result.sort('-position')
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skipPage = (page - 1) * limit
    result = result.skip(skipPage).limit(limit)
    const jobs = await result
    const totalJobs = await Job.countDocuments(objectQuery)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.status(StatusCodes.OK).json({
        jobs,
        totalJobs,
        numOfPages,
    })
}

const getSingleJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findOne({
        _id: id,
        createdBy: req.user.id,
    })
    if (!job) {
        throw new CustomError.NotFoundError(`No job with id ${id}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new CustomError.UnAuthenticatedError('Test user is read only')
    }
    req.body.createdBy = req.user.id
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: 'Job create successfull' })
}

const updateJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new CustomError.UnAuthenticatedError('Test user is read only')
    }
    const {
        user: { id: userId },
        body: { company, position },
        params: { id: jobId },
    } = req
    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!job) {
        throw new CustomError.NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new CustomError.UnAuthenticatedError('Test user is read only')
    }
    const job = await Job.findByIdAndRemove({
        _id: req.params.id,
        createdBy: req.user.id,
    })
    if (!job) {
        throw new CustomError.NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const getAllStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ])
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }

    const monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 },
    ])
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
    getAllStats,
}
