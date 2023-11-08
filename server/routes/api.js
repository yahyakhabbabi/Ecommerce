const express = require("express");
const router = express.Router();

const userRoute = require("./UserRoute");
const customerRoute = require("./customerRoute");
const categorieRoute = require("./categorieRoute");
const subcategorieRoute = require("./SubcategorieRoute");
const productRoute = require("./productRoute");
const orderRoute = require("./orderRoute");

router.use("/v1/users", userRoute);
router.use("/v1/customers", customerRoute);
router.use("/v1/categories", categorieRoute);
router.use("/v1/subcategories", subcategorieRoute);
router.use("/v1/products", productRoute);
router.use("/v1/orders", orderRoute);

module.exports = router;
