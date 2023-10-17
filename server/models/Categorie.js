const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    category_name: {type: string},
    active: {type: boolean}
});

module.exports = mongoose.model('categorie', categorieSchema);
