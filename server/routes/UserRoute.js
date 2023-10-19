const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router.post('/login',userController.login);
router.post('/',userController.addUsers);
router.get('/',userController.allUsers);
router.get(/^\/search/, userController.SearchUser);
router.get('/:id',userController.usersById);
router.put('/:id',userController.UpdateUser);
router.delete('/:id',userController.DeleteUser);

module.exports=router;