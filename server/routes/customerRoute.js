const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const {verifyJWTCustomer} = require('../middelware/authMiddleware')


router.post('/login',customerController.login);
router.post('/',customerController.createCustomer);
router.get('/',customerController.getAllCustomer);
router.get('/',customerController.searchCustomer);
router.get('/:id',customerController.getCustomerById);
router.put('/validate/:id',customerController.validateCustomer);
router.put('/:id',customerController.updateCustomer);
router.delete('/delete',verifyJWTCustomer,customerController.deleteCustomer);
router.get('/profile', verifyJWTCustomer, customerController.customerProfile);
router.patch('/profile/update',verifyJWTCustomer,customerController.updateDataCustomer);

module.exports=router;