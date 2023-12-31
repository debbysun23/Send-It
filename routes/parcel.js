const express = require('express')
const router = express.Router()

const {
    getAllParcelOrders,
    getParcelOrder, 
    createParcelOrder,
    updateParcelDestination,
    deleteParcelOrder
} = require('../controllers/parcelcontroller')  

router.route('/parcels').post(createParcelOrder).get(getAllParcelOrders)
router.route('/parcels/:id').get(getParcelOrder)
router.route('/parcels/:id/destination').put(updateParcelDestination)
router.route('/parcels/:id/delete').delete(deleteParcelOrder)

module.exports = router      