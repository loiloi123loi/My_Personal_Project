import express from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
} from '../controllers/productController'
import { authenticationMiddle } from '../middlewares'
import { authorizePermissions } from '../middlewares/auth-user-middle'
const router = express.Router()

router
    .route('/')
    .post([authenticationMiddle, authorizePermissions('admin')], createProduct)
    .get(getAllProduct)
router
    .route('/:id')
    .get(getSingleProduct)
    .patch([authenticationMiddle, authorizePermissions('admin')], updateProduct)
    .delete(
        [authenticationMiddle, authorizePermissions('admin')],
        deleteProduct
    )
router.route('/:id/reviews').get()

export default router
