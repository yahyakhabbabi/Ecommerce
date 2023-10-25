const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');
const {upload} = require('../middelware/uploadMiddleware')

router.post('/',verifyJWT,isAdminOrManager,upload.single('product_image'),productController.createProduct);
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
router.patch('/:id',verifyJWT,isAdminOrManager,productController.updateProduct);
router.delete('/:id',verifyJWT,isAdminOrManager,productController.deleteProduct);

module.exports=router;