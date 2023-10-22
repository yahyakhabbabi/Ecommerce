const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/',(req,res)=>{
 const {query} =req.query;
 if(query){
    productController.searchProduct(req,res);
 }else{
    productController.allProducts(req,res)
 }
}
);
router.get('/:id',productController.productById);
router.patch('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

module.exports=router;