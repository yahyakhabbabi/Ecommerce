const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {verifyJWT,checkRole} = require('../middelware/authMiddleware')


router.post('/login',userController.login);
router.post('/',verifyJWT,checkRole,userController.addUsers);
router.get('/',verifyJWT,userController.allUsers);
router.get(/^\/search/, userController.SearchUser);
router.get('/:id',userController.usersById);
router.put('/:id',userController.UpdateUser);
router.delete('/:id',userController.DeleteUser);

module.exports=router;