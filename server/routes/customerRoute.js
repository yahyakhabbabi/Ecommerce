const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');
const { JWT_SECRET, Refresh_JWT_SECRET,JWT_SECRET_customer, Refresh_JWT_SECRET_customer } = require('../config/env');
const {
    postloginCustomerValidator,
    postCreateCustomerValidator,
    postValidateCustomerValidator,
    putUpdateCustomer,
    getCustomerValidator,
    deletecustomerValidator
}=require('../utils/validator/customerValidator')
const {upload} = require('../middelware/uploadMiddleware');
const orderRoute = require("./orderRoute")
router.post('/login',/* postloginCustomerValidator */customerController.login);

router.post('/',postCreateCustomerValidator,/* verifyJWT(JWT_SECRET_customer), */customerController.createCustomer);
router.get('/validate/:id',/* postValidateCustomerValidator */customerController.validateCustomer);
router.get('/'/* ,verifyJWT(JWT_SECRET),isAdminOrManager */,(req,res,next)=>{
    if(Object.keys(req.query).length>2){
        customerController.searchCustomer(req, res, next);
    }else{
        customerController.getAllCustomer(req, res, next);
    }
});
router.get('/:id([0-9a-fA-F]{24})'/* ,getCustomerValidator,verifyJWT(JWT_SECRET),isAdminOrManager */,customerController.getCustomerById);
router.put('/:id'/* ,putUpdateCustomer,verifyJWT(JWT_SECRET),isAdminOrManager */,customerController.updateCustomer);
router.delete('/delete',verifyJWT(JWT_SECRET_customer),customerController.deleteCustomer);
router.get('/profile',verifyJWT(JWT_SECRET_customer),customerController.customerProfile);
router.patch('/profile/update',verifyJWT(JWT_SECRET_customer),upload.single('customer_image'),customerController.updateDataCustomer);




router.put('/profile/updatepassword', verifyJWT(JWT_SECRET_customer), customerController.updatePassword);


router.post("/refresh",customerController.refresh);
router.use('/:customerId/orders',orderRoute)

module.exports=router;