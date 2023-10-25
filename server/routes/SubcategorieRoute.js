const express = require('express');
const router = express.Router();

const subcategorieController = require('../controllers/subcategorieController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');

router.post("/",verifyJWT,isAdminOrManager,subcategorieController.creatSubcategorie);
router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>0){
        subcategorieController.searchSubcategories(req, res, next);
    }else{
        subcategorieController.listSubcategories(req, res, next);
    }
});
// router.get('/',subcategorieController.listSubcategories);
// router.get('/',subcategorieController.searchSubcategories);
router.get('/:id',subcategorieController.idSubcategories);
router.put('/:id',verifyJWT,isAdminOrManager,subcategorieController.updateSubcategories);
router.delete('/:id',verifyJWT,isAdminOrManager,subcategorieController.deleteSubcategories);



module.exports=router;