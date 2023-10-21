const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
<<<<<<< HEAD
    sku:{type: String,
        unique:true},
=======
    sku:{type: String},
>>>>>>> ac97f22729f6a456c7ce52437e44cbaa9d5af6b5
    product_image:{type: String},
    product_name:{type: String, 
                  unique:true},
    subcategory_id:{type: String},
    short_description:{type: String},
    long_description:{type: String},
    price:{type: Number},
    discount_price:{type: Number},
<<<<<<< HEAD
    options:{type: Blob,Array},
    active:{type:Boolean, 
            default:false}
=======
    options:{type: Array},
    active:{type:Boolean}
    
>>>>>>> ac97f22729f6a456c7ce52437e44cbaa9d5af6b5
}
)
module.exports = mongoose.model('Product', productSchema)