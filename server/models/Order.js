const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    id:{type:String},
    customer_id:{type: Schema.Types.ObjectId, ref: 'customer'},
    order_items:{type :Array, Blob},
    order_date:{type:Date, default:Date.now},
    cart_total_price:{type:Number},
    status:{type:String,
            default:'open'}
});

module.exports = mongoose.model('Orders',orderSchema)