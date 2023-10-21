const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {verifyJWT,checkRole} = require('../middelware/authMiddleware')


router.post('/login',userController.login);
router.post('/',verifyJWT,checkRole,userController.addUsers);
router.get('/',verifyJWT,userController.allUsers);
router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>0){
        userController.SearchUser(req, res, next);
    }else{
        userController.usersById(req, res, next);
    }
});
router.put('/:id',userController.UpdateUser);
router.delete('/:id',userController.DeleteUser);

module.exports=router;
