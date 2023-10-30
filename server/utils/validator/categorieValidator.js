const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middelware/validatorMiddleware");

exports.createCategorieValidator = [
  check('category_name')
    .notEmpty()
    .withMessage('Le champ category_name est obligatoire'),

  validatorMiddleware,
];
exports.getCategorieValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid category Id'),
  validatorMiddleware,
];
exports.putCategorieValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid category Id'),

  check('category_name')
    .optional()
    .notEmpty()
    .withMessage('Le champ category_name est obligatoire'),

  check('active')
    .optional()
    .isBoolean()
    .withMessage('Le champ active doit être true ou false'),

  validatorMiddleware,
];
exports.deleteCategorieValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid category Id'),
  validatorMiddleware,
];
