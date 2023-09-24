const express = require('express')
const router = express.Router()

const { register, login, updateUser } = require('../controllers/authController')

const authenMiddleware = require('../middleware/authentication')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenMiddleware, updateUser)

module.exports = router
