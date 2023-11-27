const express = require('express');
const router = express.Router();


const categorieController = require('../controllers/categorieController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');
const { JWT_SECRET, Refresh_JWT_SECRET,JWT_SECRET_customer, Refresh_JWT_SECRET_customer } = require('../config/env');
const {
    createCategorieValidator,
    getCategorieValidator,
    putCategorieValidator,
    deleteCategorieValidator
} = require('../utils/validator/categorieValidator');
const SubcategorieRoute = require('./SubcategorieRoute')


router.post('/',createCategorieValidator,/* verifyJWT(JWT_SECRET),isAdminOrManager, */categorieController.creatCategorie);
router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>1){
        categorieController.searchCategories(req, res, next);
    }else{
        categorieController.listCategories(req, res, next);
    }
});
router.get('/:id',categorieController.idCategories);
router.put('/:id'/* ,putCategorieValidator,verifyJWT(JWT_SECRET),isAdminOrManager */,categorieController.updateCategories);
router.delete('/:id',deleteCategorieValidator,verifyJWT(JWT_SECRET),isAdminOrManager,categorieController.deleteCategories);
router.use('/:categoryId/subcategories',SubcategorieRoute)



module.exports=router;