const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    order_items: { type: Array, 
                   required: true }, 
    order_date: { type: Date,
                   default: Date.now }, 
    cart_total_price: { type: Number, 
                    required: true }, 

    status: { 
        type: String,
        default:"open"
    }
});


module.exports = {Order:mongoose.model('Order', orderSchema)}; 

