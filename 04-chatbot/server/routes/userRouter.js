const express = require('express')
const router = express.Router()
const { authenticationMid } = require('../middlewares')
const {
    getSingleUser,
    currentUser,
    updateProfile,
    updateUserPassword,
} = require('../controllers/userController')

router.route('/my-profile').get(currentUser)
router.route('/update-profile').patch(updateProfile)
router.route('/change-password').patch(updateUserPassword)
router.route('/profile/:id').get(getSingleUser)

module.exports = router
