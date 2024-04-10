import express from 'express'
import {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
} from '../controllers/userController'
import { authorizePermissions } from '../middlewares/auth-user-middle'
const router = express.Router()

router.route('/').get(authorizePermissions('admin'), getAllUser)
router.route('/my-profile').get(showCurrentUser)
router.route('/update-user').patch(updateUser)
router.route('/change-password').patch(updateUserPassword)
router.route('/:id').get(getSingleUser)

export default router
