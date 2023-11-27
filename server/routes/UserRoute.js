const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const {verifyJWT,isAdmin,isAdminOrManager} = require("../middelware/authMiddleware");
const {
  JWT_SECRET,
  Refresh_JWT_SECRET,
  JWT_SECRET_customer,
  Refresh_JWT_SECRET_customer,} = require("../config/env");
const {
  postloginUserValidator,
  postcreateUserValidator,
  getUserValidator,
  putUserValidator,
  deleteUserValidator,} = require("../utils/validator/userValidator");

router.post("/login",postloginUserValidator, userController.login);
router.post("/",/* postcreateUserValidator,verifyJWT(JWT_SECRET), isAdmin, */ userController.addUsers);
router.get("/", /* verifyJWT(JWT_SECRET), */ (req, res, next) => {
  if (Object.keys(req.query).length > 2) {
    userController.SearchUser(req, res, next);
  } else {
    userController.allUsers(req, res, next);
  }
});
router.get("/:id",/* getUserValidator,verifyJWT(JWT_SECRET),isAdminOrManager */userController.usersById);
router.put("/:id",putUserValidator,verifyJWT(JWT_SECRET), /* isAdmin, */ userController.UpdateUser);
router.delete("/:id",/* deleteUserValidator,verifyJWT(JWT_SECRET),isAdmin, */userController.DeleteUser);
router.post("/refresh",userController.refresh)

module.exports = router;
