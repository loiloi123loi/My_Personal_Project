const express = require('express')
const router = express.Router()

const rateLimitter = require('express-rate-limit')

const { register, login, updateUser } = require('../controllers/authController')

const authenMiddleware = require('../middleware/authentication')

const limiter = rateLimitter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        msg: 'Too many request from this IP, please try after 15 minutes',
    },
})

router.route('/register').post(limiter, register)
router.route('/login').post(limiter, login)
router.route('/updateUser').patch(authenMiddleware, updateUser)

module.exports = router
