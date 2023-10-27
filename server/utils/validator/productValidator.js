const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middelware/validatorMiddleware");

exports.postCreateProductValidator = [
  // check('sku').notEmpty().withMessage('Le champ sku est obligatoire'),
  // check('product_name').notEmpty().withMessage('Le champ product_name est obligatoire'),
  // check('short_description').notEmpty().withMessage('Le champ short_description est obligatoire'),
  // check('long_description').notEmpty().withMessage('Le champ long_description est obligatoire'),
  // check('price').notEmpty().withMessage('Le champ price est obligatoire'),
  // check('quantity').notEmpty().withMessage('Le champ quantity est obligatoire'),
  // check('discount_price').notEmpty().withMessage('Le champ discount_price est obligatoire'),
  // check('options').notEmpty().withMessage('Le champ options est obligatoire'),
  // check('subcategory_id').isMongoId().withMessage('Invalid subcategory Id'),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid product Id'),
  validatorMiddleware,
];

exports.patchProductValidator = [
  check('id').isMongoId().withMessage('Invalid product Id'),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid product Id'),
  validatorMiddleware,
];
