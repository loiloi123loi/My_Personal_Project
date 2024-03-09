const express = require('express')
const router = express.Router()
const { authenticationMiddle, authorizePermissions } = require('../middlewares')
const {
    getAllUsers,
    showCurrentUser,
    updateUser,
    updateUserPassword,
} = require('../controllers/userController')

router
    .route('/')
    .get(authenticationMiddle, authorizePermissions('admin'), getAllUsers)
// router.route('/showMe').get(authenticateUser, showCurrentUser)
// router.route('/updateUser').patch(authenticateUser, updateUser)
// router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)
// router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router
