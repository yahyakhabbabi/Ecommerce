const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName:  { type: String },
    email: { type: String, 
            unique: true, 
            required: [true, "Please provide a unique email"]},
    role: { type: String },
    user_name: { type: String, 
                 required: [true, "Please provide a unique username"],
                 unique: [true, "Username already exists"],},
    password: { type: String,
                required: [true, "Please provide a password"]},
    last_login: { type: Date, default: Date.now  },  
    active: { type: Boolean, 
           default: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Users", UserSchema);
