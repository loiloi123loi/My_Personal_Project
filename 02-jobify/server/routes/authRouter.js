const express = require('express')
const router = express.Router()

const {
    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateUser,
    currentUser,
} = require('../controllers/authController')

const authenticationMiddleware = require('../middleware/authentication')

router.route('/local/register').post(register)
router.route('/verify-email').post(verifyEmail)
router.route('/local/login').post(login)
router.route('/login').post(login)
router.route('/logout').delete(authenticationMiddleware, logout)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)
router.route('/update-user').patch(authenticationMiddleware, updateUser)
router.route('/current-user').get(authenticationMiddleware, currentUser)

module.exports = router
