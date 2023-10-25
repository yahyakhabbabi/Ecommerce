const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');


router.post('/login',customerController.login);
router.post('/',verifyJWT,customerController.createCustomer);
router.put('/validate/:id',customerController.validateCustomer);
router.get('/',verifyJWT,isAdminOrManager,(req,res,next)=>{
    if(Object.keys(req.query).length>2){
        customerController.searchCustomer(req, res, next);
    }else{
        customerController.getAllCustomer(req, res, next);
    }
});
router.get('/:id([0-9a-fA-F]{24})',verifyJWT,isAdminOrManager,customerController.getCustomerById);
// router.put('/validate/:id',customerController.validateCustomer);
router.put('/:id',verifyJWT,isAdminOrManager,customerController.updateCustomer);
router.delete('/delete',verifyJWT,customerController.deleteCustomer);
router.get('/profile',verifyJWT,customerController.customerProfile);
router.patch('/profile/update',verifyJWT,customerController.updateDataCustomer);

module.exports=router;