const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a unique email"],
    },
    role: { type: String, enum: ["Admin", "Manager"], default: "Admin" },
    user_name: {
      type: String,
      required: [true, "Please provide a unique username"],
      unique: true,
    },
    userImage: {
      type: String,
    },
    password: { type: String, required: [true, "Please provide a password"] },
    last_login: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = { Users: mongoose.model("Users", UserSchema) };
