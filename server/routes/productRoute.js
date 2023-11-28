const {Router} = require('express');
const router = Router({mergeParams:true});

const productController = require('../controllers/productController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');
const { JWT_SECRET, Refresh_JWT_SECRET,JWT_SECRET_customer, Refresh_JWT_SECRET_customer } = require('../config/env');
const {upload} = require('../middelware/uploadMiddleware');
const {
    postCreateProductValidator,
    getProductValidator,
    patchProductValidator,
    deleteProductValidator
} = require('../utils/validator/productValidator');

router.post('/'/* ,postCreateProductValidator,verifyJWT(JWT_SECRET),isAdminOrManager  */,upload.single('product_image'),productController.createProduct);
router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>1){
        productController.searchProduct(req, res, next);
    }else{
        productController.allProducts(req, res, next);
    }
});

router.get('/:id'/* ,getProductValidator, */,productController.productById);
router.patch('/:id' ,/* patchProductValidator verifyJWT(JWT_SECRET) ,isAdminOrManager */productController.updateProduct);
router.delete('/:id',/* deleteProductValidator,verifyJWT(JWT_SECRET),isAdminOrManager, */productController.deleteProduct);

module.exports=router;