import express from 'express'
import {
    getCart,
    addProductToCart,
    updateCart,
    deleteProductInCart,
} from '../controllers/cartController'
const router = express.Router()

router.route('/').get(getCart).post(addProductToCart)
router.route('/:productId').patch(updateCart).delete(deleteProductInCart)

export default router
