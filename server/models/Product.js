const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku:{type: String,
        unique:true},
    product_image:{type: String},
    product_name:{type: String, 
                  unique:true},
    subcategory_id:{type: String},
    short_description:{type: Text},
    long_description:{type: Text},
    price:{type: Number},
    discount_price:{type: Number},
    options:{type: Blob,Array},
    active:{type:Boolean, 
            default:false}
}
)
module.exports = mongoose.model('Product', productSchema)