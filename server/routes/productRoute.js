const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/',productController.allProducts);
router.get('/',productController.searchProduct);
router.get('/:id',productController.productById);
router.patch('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);
=======
const productController = require('../controllers/productController')













>>>>>>> ac97f22729f6a456c7ce52437e44cbaa9d5af6b5

module.exports=router;