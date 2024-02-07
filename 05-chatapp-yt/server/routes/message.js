const express = require('express')
const router = express.Router()
const { sendMessage, getMessage } = require('../controllers/message')

router.route('/send/:id').post(sendMessage)
router.route('/:id').get(getMessage)

module.exports = router
