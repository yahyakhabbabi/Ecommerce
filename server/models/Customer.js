const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
     firstName: { type: String },
    
     lastName: { type: String },
    
     email: { type: String, 
          unique: true, 
          required: [true, "Please provide a unique email"]},
    
     password: { type: String,
               required: [true, "Please provide a password"]},
     
     last_login: { type: Number, default: Date.now() },
     
     valid_account:{type:Boolean},
     
     active: { type: Boolean, 
          default: true },
    


},{timestamps:true});
module.exports = mongoose.model('Customers', customersSchema) ;