const express = require('express')
const router = express.Router()

const {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
    getAllStats,
} = require('../controllers/jobsController')

router.route('/').get(getAllJobs).post(createJob)
router.route('/stats').get(getAllStats)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router
