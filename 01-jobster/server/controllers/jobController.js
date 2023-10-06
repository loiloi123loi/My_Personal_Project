const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const mongoose = require('mongoose')

const getAllJobs = async (req, res) => {
    const { status, jobType, sort, search } = req.query

    let objQuery = { createdBy: req.user.id }

    if (search) {
        objQuery.position = { $regex: search, $options: 'i' }
    }

    if (status && status !== 'all') {
        objQuery.status = status
    }

    if (jobType && jobType !== 'all') {
        objQuery.jobType = jobType
    }

    let result = Job.find(objQuery)

    if (sort === 'lastest') {
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
    const limit = Number(req.query.limit) || 4
    const skipPage = (page - 1) * limit
    result = result.skip(skipPage).limit(limit)

    const jobs = await result
    const totalJobs = await Job.countDocuments(objQuery)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const getSingleJob = async (req, res) => {
    const job = await Job.findOne({
        _id: req.params.id,
        createdBy: req.user.id,
    })
    if (!job) {
        throw new CustomError.NotFoundError(`No job with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new CustomError.BadRequestError('Test User can read only')
    }
    const job = await Job.create({
        ...req.body,
        createdBy: req.user.id,
    })
    res.status(StatusCodes.OK).json({ msg: 'OK' })
}

const updateJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new CustomError.BadRequestError('Test User can read only')
    }
    const {
        body: { company, position },
        params: { id: jobId },
        user: { id: userId },
    } = req

    if (company === '' || position === '') {
        throw new CustomError.BadRequestError(
            'Please provide company and position'
        )
    }

    const job = await Job.findOneAndUpdate(
        {
            _id: jobId,
            createdBy: userId,
        },
        req.body,
        { new: true, runValidators: true }
    )

    if (!job) {
        throw new CustomError.NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ msg: 'Update OK' })
}

const deleteJob = async (req, res) => {
    if (req.user.isTestUser) {
        throw new CustomError.BadRequestError('Test User can read only')
    }
    const job = await Job.findByIdAndRemove({
        _id: req.params.id,
        createdBy: req.user.id,
    })
    if (!job) {
        throw new CustomError.NotFoundError(`No job with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ msg: 'Delete OK' })
}

const getAllStats = async (req, res) => {
    let stats = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.id),
            },
        },
        {
            $group: {
                _id: '$status',
                count: {
                    $sum: 1,
                },
            },
        },
    ])
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})

    defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }

    const monthlyApplications = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.id),
            },
        },
        {
            $group: {
                _id: {
                    year: {
                        $year: '$createdAt',
                    },
                    month: {
                        $month: '$createdAt',
                    },
                },
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                '_id.year': -1,
                '_id.month': -1,
            },
        },
        {
            $limit: 12,
        },
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
