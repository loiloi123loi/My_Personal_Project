const express = require('express')
const router = express.Router()
const {
    createNewChat,
    deleteChat,
    editChatName,
    getAllChat,
} = require('../controllers/chatController')

router.route('/create-new-chat').post(createNewChat)
router.route('/:id').delete(deleteChat).patch(editChatName)
router.route('/').get(getAllChat)

module.exports = router
