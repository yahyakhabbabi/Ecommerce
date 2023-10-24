const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    id:{type:String, unique:true, required:true},
    sku: { type: String, unique: true, required: true },
    product_image: { type: String },
    product_name: { type: String, unique: true, required: true },
    subcategory_id: { type: Schema.Types.ObjectId, ref: 'Subcategory' },
    short_description: { type: String },
    long_description: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    discount_price: { type: Number, default: null },
    options: { type: mongoose.Schema.Types.Mixed },
    active: { type: Boolean, default: false }
});

module.exports = mongoose.model('Products', productSchema);
