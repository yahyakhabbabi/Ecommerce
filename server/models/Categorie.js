const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    category_name: {type: string,
                     required: true,
                     unique: true},
    active: {type: boolean,
        default: false,
         required:true}
});

module.exports = mongoose.model('categorie', categorieSchema);
