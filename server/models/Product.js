const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku:{type: String,
        unique:true},
    product_image:{type: String},

    subcategory_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategorie' },

    product_name:{type: String, 
                  unique:true},

    short_description:{type: String},
    long_description:{type: String},
    price:{type: Number},
    discount_price:{type: Number},
    options:{type: Array},
    active:{type:Boolean, 
            default:false}
    
    
}
)
module.exports = {Product:mongoose.model('Product', productSchema)}