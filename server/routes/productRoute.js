const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/',productController.allProducts);
router.get('/',productController.searchProduct);
router.get('/:id',productController.productById);
router.patch('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);




module.exports=router;