const {Router} = require('express');
const router = Router({mergeParams:true});

const subcategorieController = require('../controllers/subcategorieController');
const productRoute = require('./productRoute')
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');
const { JWT_SECRET, Refresh_JWT_SECRET,JWT_SECRET_customer, Refresh_JWT_SECRET_customer } = require('../config/env');
const {
    postCreateSubcategoryValidator,
    getSubcategoryValidator,
    putSubcategoryValidator,
    deleteSubcategoryValidator
}=require('../utils/validator/subcategorieValidator');


router.post("/",postCreateSubcategoryValidator,verifyJWT(JWT_SECRET),isAdminOrManager,subcategorieController.creatSubcategorie);
router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>1){
        subcategorieController.searchSubcategories(req, res, next);
    }else{
        subcategorieController.listSubcategories(req, res, next);
    }
});
router.get('/:id',getSubcategoryValidator,subcategorieController.idSubcategories);
router.put('/:id'/* ,putSubcategoryValidator,verifyJWT(JWT_SECRET),isAdminOrManager */,subcategorieController.updateSubcategories);
router.delete('/:id',deleteSubcategoryValidator,verifyJWT(JWT_SECRET),isAdminOrManager,subcategorieController.deleteSubcategories);
router.use('/:subcategoryId/products',productRoute)


module.exports=router;