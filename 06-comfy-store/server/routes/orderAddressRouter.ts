import express from 'express'
import {
    changeInfoOrderAddress,
    createOrderAddress,
    deleteOrderAddress,
    getAllOrderAddress,
    getSingleOrderAddress,
} from '../controllers/orderAddressController'
const router = express.Router()

router.route('/').get(getAllOrderAddress).post(createOrderAddress)
router
    .route('/:id')
    .get(getSingleOrderAddress)
    .patch(changeInfoOrderAddress)
    .delete(deleteOrderAddress)

export default router
