const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema(
  {
    firstName: { type: String },

    lastName: { type: String },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a unique email"],
    },

    password: { type: String, required: [true, "Please provide a password"] },

    last_login: { type: Date, default: Date.now() },

    valid_account: { type: Boolean, default: false },

    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = { Customers: mongoose.model("Customers", customersSchema) };
