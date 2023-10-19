const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id:{type : String},
    order_items:{type : Array},
    order_date:{type:Date},
    cart_total_price:{type:Number},
    status:{type:String}
});

module.exports = mongoose.model('Orders',orderSchema)