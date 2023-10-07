const express = require('express')
const router = express.Router()

const { getInfo } = require('../controllers/adminController')

router.route('/').get(getInfo)

module.exports = router
