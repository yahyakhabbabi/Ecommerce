const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middelware/validatorMiddleware");

exports.postloginUserValidator = [
  check("user_name")
    .notEmpty()
    .withMessage("The user_name field is required")
    .isString()
    .withMessage("Enter a string for the username"),
  check("password")
    .notEmpty()
    .withMessage("Password is required"),
  validatorMiddleware,
];

exports.postcreateUserValidator = [
  check("user_name")
    .notEmpty()
    .withMessage("The user_name field is required")
    .isString()
    .withMessage("Enter a string for the username"),
  check("firstName")
    .isString()
    .withMessage("Enter a string for the first name"),
  check("lastName").isString().withMessage("Enter a string for the last name"),
  check("email")
    .notEmpty()
    .withMessage("The email field is required")
    .isEmail()
    .withMessage("Enter a valid email address"),
  check("role")
    .isString()
    .withMessage("You should enter Admin or Manager")
    .isIn(["Admin", "Manager"])
    .withMessage("Choose between Admin and Manager"),
  check("password")
    .notEmpty()
    .withMessage("The password field is required")
    .isLength({ min: 8 })
    .withMessage("Password is too short"),
  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];

exports.putUserValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  check("user_name")
    .optional()
    .isString()
    .withMessage("Enter a string for the username"),
  check("firstName")
    .optional()
    .isString()
    .withMessage("Enter a string for the first name"),
  check("lastName")
    .optional()
    .isString()
    .withMessage("Enter a string for the last name"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Enter a valid email address"),
  check("role")
    .optional()
    .isString()
    .withMessage("You should enter Admin or Manager")
    .isIn(["Admin", "Manager"])
    .withMessage("Choose between Admin and Manager"),
  check("active").optional().isBoolean().withMessage("Enter true or false"),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];
