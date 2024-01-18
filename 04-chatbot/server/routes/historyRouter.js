const express = require('express')
const router = express.Router()
const { getHistory, ask } = require('../controllers/historyController')

router.route('/').get(getHistory).post(ask)

module.exports = router
