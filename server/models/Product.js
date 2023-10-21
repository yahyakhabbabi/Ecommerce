const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku:{type: String},
    product_image:{type: String},
    product_name:{type: String},
    subcategory_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategorie' },
    short_description:{type: String},
    long_description:{type: String},
    price:{type: Number},
    discount_price:{type: Number},
    options:{type: Array},
    active:{type:Boolean}
    
}
)

module.exports = mongoose.model('Product', productSchema)