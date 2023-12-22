const express = require('express')
const router = express.Router()
const {
    registerLocal,
    loginLocal,
    verifyEmail,
    logout,
} = require('../controllers/authController')
const { authenticationMid } = require('../middlewares')

router.route('/local-register').post(registerLocal)
router.route('/verify-email').post(verifyEmail)
router.route('/local-login').post(loginLocal)
router.route('/logout').delete(authenticationMid, logout)

module.exports = router
