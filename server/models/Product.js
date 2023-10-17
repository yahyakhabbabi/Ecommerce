const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{type: String},
    sku:{type: String},
    product_image:{type: String},
    product_name:{type: String},
    subcategory_id:{type: String},
    short_description:{type: Text},
    long_description:{type: Text},
    price:{type: Number},
    discount_price:{type: Number},
    options:{type: Blob,Array},
    active:{type:Boolean}
    
}
)

module.exports = mongoose.model('Product', productSchema)