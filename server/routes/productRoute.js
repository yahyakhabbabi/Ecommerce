const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>1){
        productController.searchProduct(req, res, next);
    }else{
        productController.allProducts(req, res, next);
    }
});
// router.get('/',productController.allProducts);
// router.get('/',productController.searchProduct);

router.get('/:id',productController.productById);
router.patch('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

module.exports=router;