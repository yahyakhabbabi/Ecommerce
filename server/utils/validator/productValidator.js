const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middelware/validatorMiddleware");

exports.postCreateProductValidator = [
  check("sku")
          .notEmpty()
          .withMessage("SKU is required")
          .isString()
          .withMessage("SKU must be a string"),
        check("product_image").notEmpty().withMessage("Product image is required"),
        check("product_name").notEmpty().withMessage("Product name is required"),
        check("subcategory_id")
          .notEmpty()
          .isString()
          .withMessage("Subcategory ID must be a string"),
        check("short_description")
          .notEmpty()
          .withMessage("Short description is required"),
        check("long_description")
          .notEmpty()
          .withMessage("Long description is required"),
        check("price")
          .notEmpty()
          .withMessage("Price is required")
          .isNumeric()
          .withMessage("Price must be a number"),
        check("discount_price")
          .optional()
          .isNumeric()
          .withMessage("Discount price must be a number"),
        check("options")
          .optional()
          .isArray()
          .withMessage("Options must be an array"),
      
  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid product Id'),
  validatorMiddleware,
];

exports.patchProductValidator = [
  check('id').isMongoId().withMessage('Invalid product Id'),
  check("sku")
   .optional()
  .notEmpty()
  .withMessage("SKU is required")
  .isString()
  .withMessage("SKU must be a string"),
check("product_image").optional().notEmpty().withMessage("Product image is required"),
check("product_name") .optional().notEmpty().withMessage("Product name is required"),
check("subcategory_id")
   .optional()
  .notEmpty()
  .isString()
  .withMessage("Subcategory ID must be a string"),
check("short_description")
   .optional()
  .notEmpty()
  .withMessage("Short description is required"),
check("long_description")
   .optional()
   .notEmpty()
  .withMessage("Long description is required"),
check("price")
  .optional()
  .notEmpty()
  .withMessage("Price is required")
  .isNumeric()
  .withMessage("Price must be a number"),
check("discount_price")
  .optional()
  .isNumeric()
  .withMessage("Discount price must be a number"),
check("options")
  .optional()
  .isArray()
  .withMessage("Options must be an array"),
check("active")
.optional()
  .isBoolean()
  .withMessage("Active must be a boolean value"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid product Id'),
  validatorMiddleware,
];
