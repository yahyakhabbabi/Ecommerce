const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');


router.post('/',verifyJWT,orderController.createOrder);
router.get('/',verifyJWT,isAdminOrManager,orderController.allOrders);
router.get('/:id',verifyJWT,isAdminOrManager,orderController.orderById);
router.put('/:id',verifyJWT,isAdminOrManager,orderController.updateOrder)

module.exports=router;