const express = require('express')
const router = express.Router()
const { authenticationMid, authorizePermissions } = require('../middlewares')
const {
    getAllUsers,
    getSingleUser,
    currentUser,
    updateProfile,
    updateUserPassword,
} = require('../controllers/userController')

router
    .route('/all-users')
    .get(authenticationMid, authorizePermissions('admin'), getAllUsers)
router.route('/my-profile').get(authenticationMid, currentUser)
router.route('/update-profile').patch(authenticationMid, updateProfile)
router.route('/change-password').patch(authenticationMid, updateUserPassword)
router.route('/profile/:id').get(authenticationMid, getSingleUser)

module.exports = router
