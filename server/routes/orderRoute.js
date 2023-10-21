const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController')


router.post('/order',orderController.createOrder);
router.get('/',orderController.allOrders);
router.get('/:id',orderController.orderById);
router.put('/:id',orderController.updateOrder)










module.exports=router;