import express from 'express'
import {
    createReviewProduct,
    getAllReviewProduct,
} from '../controllers/reviewController'
const router = express.Router()

router.route('/:productId').get(getAllReviewProduct).post(createReviewProduct)

export default router
