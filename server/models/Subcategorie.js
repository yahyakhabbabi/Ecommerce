const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcategory_name: {
    type: String,
    required: true,
    unique: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categorie",
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = {
  Subcategory: mongoose.model("Subcategory", subcategorySchema),
};
