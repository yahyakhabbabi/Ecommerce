const {Router} = require('express');
const router = Router({mergeParams:true});

const orderController = require('../controllers/orderController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');
const { JWT_SECRET, Refresh_JWT_SECRET,JWT_SECRET_customer, Refresh_JWT_SECRET_customer } = require('../config/env');
const {
    postCreateOrderValidator,
    getOrderValidator,
    putOrderValidator
} = require('../utils/validator/orderValidator'); 

router.post('/',postCreateOrderValidator,verifyJWT(JWT_SECRET_customer),orderController.createOrder);
router.get('/'/* ,verifyJWT(JWT_SECRET),isAdminOrManager */,orderController.allOrders);
router.get('/:id',/* getOrderValidator,verifyJWT(JWT_SECRET),isAdminOrManager, */orderController.orderById);
router.put('/:id',/* putOrderValidator,verifyJWT(JWT_SECRET),isAdminOrManager, */orderController.updateOrder)
router.put('/:id/:itemId',/* putOrderValidator,verifyJWT(JWT_SECRET),isAdminOrManager, */orderController.updateOrderItem)

module.exports=router;