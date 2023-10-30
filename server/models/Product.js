const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  sku: { type: String, unique: true },
  product_image: {
    type: String,
  },
  product_name: {
    type: String,
    unique: true,
  },
  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  short_description: {
    type: String,
  },
  long_description: {
    type: String,
  },
  price: { type: Number },
  discount_price: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  options: { type: Array },
  active: { type: Boolean, default: false },
});
module.exports = { Product: mongoose.model("Product", productSchema) };
