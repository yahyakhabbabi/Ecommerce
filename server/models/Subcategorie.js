const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    subcategory_name: {type: string,
    required: true,
    unique: true},
    category_id: {type: string,
    required: true},
    active: {type: boolean,
    require: true,
    default: false}
});

module.exports = mongoose.model('subcategory', subcategorySchema);