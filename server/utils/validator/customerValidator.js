const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middelware/validatorMiddleware");

exports.postloginCustomerValidator = [
  check("email")
    .notEmpty()
    .withMessage("Le champ user_name est obligatoire")
    .isEmail()
    .withMessage("enter a string username"),
  check("password")
    .notEmpty()
    .isStrongPassword()
    .withMessage("Password is required")
    .withMessage(
      "Weak password, It should  Be at least 8 characters long. Include a combination of uppercase letters, lowercase letters, numbers, and special characters. Avoid common words, phrases, or easily guessable information"
    ),

  validatorMiddleware,
];

exports.postCreateCustomerValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("Le champ firstName est obligatoire")
    .isString()
    .withMessage("Le champ firstName doit être une chaîne de caractères"),

  check("lastName")
    .notEmpty()
    .withMessage("Le champ lastName est obligatoire")
    .isString()
    .withMessage("Le champ lastName doit être une chaîne de caractères"),

  check("email")
    .notEmpty()
    .withMessage("Le champ email est obligatoire")
    .isEmail()
    .withMessage("Le champ email doit être une adresse e-mail valide"),

  check("password")
    .notEmpty()
    .withMessage("Le champ password est obligatoire")
    .isLength({ min: 8 })
    .withMessage("Le champ password doit avoir au moins 8 caractères"),
  validatorMiddleware,
];
exports.postValidateCustomerValidator = [
  check("id").isMongoId().withMessage("Invalid categorie Id"),
  validatorMiddleware,
];
exports.putUpdateCustomer = [
  check("id").isMongoId().withMessage("Invalid categorie Id"),
  check("firstName")
    .optional()
    .isString()
    .withMessage("Le champ firstName doit être une chaîne de caractères"),

  check("lastName")
    .optional()
    .isString()
    .withMessage("Le champ lastName doit être une chaîne de caractères"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Le champ email doit être une adresse e-mail valide"),

  check("active")
    .optional()
    .isBoolean()
    .withMessage("Le champ active doit être true ou false"),
  validatorMiddleware,
];
exports.getCustomerValidator = [
  check("id").isMongoId().withMessage("Invalid categorie Id"),
  validatorMiddleware,
];
exports.deletecustomerValidator = [
  check("id").isMongoId().withMessage("Invalid categorie Id"),
  validatorMiddleware,
];
