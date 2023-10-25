const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {verifyJWT,isAdmin,isAdminOrManager} = require('../middelware/authMiddleware');


router.post('/login',userController.login);
router.post('/',verifyJWT,isAdmin,userController.addUsers);

router.get('/',verifyJWT,isAdminOrManager,(req,res,next)=>{
    if(Object.keys(req.query).length>2){
        userController.SearchUser(req, res, next);
    }else{
        userController.allUsers(req, res, next);
    }
});
router.get('/:id',verifyJWT,isAdminOrManager,userController.usersById);
router.put('/:id',verifyJWT,isAdmin,userController.UpdateUser);
router.delete('/:id',verifyJWT,isAdmin,userController.DeleteUser);

module.exports=router;
