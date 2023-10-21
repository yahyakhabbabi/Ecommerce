const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id:{type : String},
<<<<<<< HEAD
    order_items:{type : Blob,Array},
    order_date:{type:Date, default:Date.now},
=======
    order_items:{type : Array},
    order_date:{type:Date},
>>>>>>> ac97f22729f6a456c7ce52437e44cbaa9d5af6b5
    cart_total_price:{type:Number},
    status:{type:String,
            default:open}
});

module.exports = mongoose.model('Orders',orderSchema)