const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middelware/validatorMiddleware");

exports.postCreateOrderValidator = [

  check('order_items')
    .isArray()
    .withMessage('Le champ order_items doit être un tableau'),

  check('cart_total_price')
    .isNumeric()
    .withMessage('Le champ cart_total_price doit être un nombre'),


  validatorMiddleware,
];

exports.getOrderValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid order Id'),

  validatorMiddleware,
];

exports.putOrderValidator = [
  check('id')
  .isMongoId()
  .withMessage('Invalid order Id'),

  check('status')
    .optional()
    .isString()
    .withMessage('Le champ status doit être une chaîne de caractères'),

  validatorMiddleware,
];


