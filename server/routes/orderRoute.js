const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');
const { JWT_SECRET, Refresh_JWT_SECRET,JWT_SECRET_customer, Refresh_JWT_SECRET_customer } = require('../config/env');
const {
    postCreateOrderValidator,
    getOrderValidator,
    putOrderValidator
} = require('../utils/validator/orderValidator'); 

router.post('/',postCreateOrderValidator,verifyJWT(JWT_SECRET_customer),orderController.createOrder);
router.get('/',verifyJWT(JWT_SECRET),isAdminOrManager,orderController.allOrders);
router.get('/:id',getOrderValidator,verifyJWT(JWT_SECRET),isAdminOrManager,orderController.orderById);
router.put('/:id',putOrderValidator,verifyJWT(JWT_SECRET),isAdminOrManager,orderController.updateOrder)

module.exports=router;