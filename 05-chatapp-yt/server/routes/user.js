const express = require('express')
const router = express.Router()
const { getAllUserOnline } = require('../controllers/user')

router.route('/').get(getAllUserOnline)

module.exports = router
