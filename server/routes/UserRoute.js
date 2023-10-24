const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {verifyJWT,checkRole} = require('../middelware/authMiddleware')


router.post('/login',userController.login);
router.post('/',userController.addUsers);

router.get('/',(req,res,next)=>{
    if(Object.keys(req.query).length>2){
        userController.SearchUser(req, res, next);
    }else{
        userController.allUsers(req, res, next);
    }
});
router.get('/:id', userController.usersById);
router.put('/:id',userController.UpdateUser);
router.delete('/:id',userController.DeleteUser);

module.exports=router;
