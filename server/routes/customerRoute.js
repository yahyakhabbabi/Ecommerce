const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');


router.post('/login',customerController.login);
router.post('/',customerController.createCustomer);
router.get('/',customerController.getAllCustomer);
router.get('/',customerController.searchCustomer);
router.get('/:id',customerController.getCustomerById);
router.put('/validate/:id',customerController.validateCustomer);
router.put('/:id',customerController.updateCustomer);
router.delete('/delete',customerController.deleteCustomer);
router.patch('/profile/update',customerController.updateDataCustomer)




module.exports=router;