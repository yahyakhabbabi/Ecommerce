const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middelware/validatorMiddleware");

exports.postCreateSubcategoryValidator = [
  check('subcategory_name')
    .notEmpty()
    .withMessage('The subcategory_name field is required'),

  check('category_id')
    .isMongoId()
    .withMessage('Invalid category ID'),

  validatorMiddleware,
];

exports.getSubcategoryValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid subcategory ID'),
  validatorMiddleware,
];

exports.putSubcategoryValidator = [
  check('id')
  .isMongoId()
  .withMessage('Invalid subcategory ID'),
  
  check('subcategory_name')
    .optional()
    .notEmpty()
    .withMessage('The subcategory_name field is required'),

  check('category_id')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID'),

  check('active')
    .optional()
    .isBoolean()
    .withMessage('The active field must be true or false'),

  validatorMiddleware,
];

exports.deleteSubcategoryValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid subcategory ID'),
  validatorMiddleware,
];
