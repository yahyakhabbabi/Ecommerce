const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const {verifyJWTCustomer} = require('../middelware/authMiddleware')


router.post('/login',customerController.login);
router.post('/',customerController.createCustomer);
router.put('/validate/:id',customerController.validateCustomer);
router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>2){
        customerController.searchCustomer(req, res, next);
    }else{
        customerController.getAllCustomer(req, res, next);
    }
});
router.get('/:id([0-9a-fA-F]{24})', customerController.getCustomerById);
router.put('/validate/:id',customerController.validateCustomer);
router.put('/:id',customerController.updateCustomer);
router.delete('/delete',verifyJWTCustomer,customerController.deleteCustomer);
router.get('/profile', verifyJWTCustomer, customerController.customerProfile);
router.patch('/profile/update',verifyJWTCustomer,customerController.updateDataCustomer);

module.exports=router;