const express = require('express');
const router = express.Router();

const categorieController = require('../controllers/categorieController');



router.post('/',categorieController.creatCategorie);
router.get('/',categorieController.listCategories);
router.get('/',categorieController.searchCategories);
router.get('/:id',categorieController.idCategories);
router.put('/:id',categorieController.updateCategories);
router.delete('/:id',categorieController.deleteCategories);



module.exports=router;