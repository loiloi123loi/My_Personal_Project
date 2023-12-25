const express = require('express')
const router = express.Router()
const {
    registerLocal,
    loginLocal,
    verifyEmail,
    logout,
    forgotPassword,
    resetPassword,
    registerGoogle,
    callPassportGoogle,
    loginGoogle,
} = require('../controllers/authController')
const { authenticationMid } = require('../middlewares')

router.route('/local-register').post(registerLocal)
router.route('/verify-email').post(verifyEmail)
router.route('/local-login').post(loginLocal)
router.route('/logout').delete(authenticationMid, logout)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)
router.route('/register/google/callback').get(registerGoogle)
router.route('/register/google').get(callPassportGoogle)
router.route('/login/google/callback').get(loginGoogle)
router.route('/login/google').get(callPassportGoogle)

module.exports = router
