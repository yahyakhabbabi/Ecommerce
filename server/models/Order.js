const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id:{type : String},
    customer_id:{type : String},
    order_items:{type : Blob,Array},
    order_date:{type:Date},
    cart_total_price:{type:Number},
    status:{type:String}
});

module.exports = mongoose.model('Order',orderSchema)