const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    category_name: {type: String,
                     required: true,
                     unique: true},
    // subcategories: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Subcategory'
    //                 }],
    active: {type: Boolean,
        default: false,
         required:true}
});


module.exports = { categorie: mongoose.model('categorie', categorieSchema) };
