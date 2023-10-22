const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    id:{type:String},
    customer_id:{type : String},
    order_items:{type :Array, Blob},
    order_date:{type:Date, default:Date.now},
    cart_total_price:{type:Number},
    status:{type:String,
            default:'open'}
});

module.exports = mongoose.model('Orders',orderSchema)