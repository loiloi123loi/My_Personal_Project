const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/authController')
const { authenticationMiddle } = require('../middlewares')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').delete(authenticationMiddle, logout)

module.exports = router
