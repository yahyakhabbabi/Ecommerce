const express = require('express');
const router = express.Router();

const subcategorieController = require('../controllers/subcategorieController');

router.post("/",subcategorieController.creatSubcategorie);
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
router.put('/:id',subcategorieController.updateSubcategories);
router.delete('/:id',subcategorieController.deleteSubcategories);



module.exports=router;