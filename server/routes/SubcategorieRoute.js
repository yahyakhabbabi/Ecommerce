const express = require('express');
const router = express.Router();

const subcategorieController = require(../controllers.subcategorieController);

router.post("/",subcategorieController.creatSubcategorie);
router.get('/',categorieController.listSubcategories);
router.get('/',categorieController.searchSubcategories);
router.get('/:id',categorieController.idSubcategories);
router.put('/:id',categorieController.updateSubcategories);
router.delete('/:id',categorieController.deleteSubcategories);



module.exports=router;