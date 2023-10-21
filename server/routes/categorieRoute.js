const express = require('express');
const router = express.Router();

const categorieController = require('../controllers/categorieController');



router.post('/',categorieController.creatCategorie);
router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>0){
        categorieController.searchCategories(req, res, next);
    }else{
        categorieController.listCategories(req, res, next);
    }
});
router.get('/:id',categorieController.idCategories);
router.put('/:id',categorieController.updateCategories);
router.delete('/:id',categorieController.deleteCategories);



module.exports=router;