const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
  },
  order_items: { type: Array, required: true },
  order_date: { type: Date, default: Date.now },
  cart_total_price: { type: Number, required: true },

  status: {
    type: String,
    default: "open",
  },
});

module.exports = { Orders: mongoose.model("Orders", orderSchema) };
