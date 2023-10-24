const { Subcategory } = require("../models/Subcategorie");
const {Product} = require("../models/Product")
const { categorie } = require("../models/Categorie");


exports.creatSubcategorie = async function (req, res,next) {
  const { subcategory_name, category_id } = req.body;

  try {
         const checkCategorie = await categorie.findOne({_id:category_id});
         if(!checkCategorie){
        return  res.status(404).json(' he doesn t existe any categorie with this categorie_id')
         }
    await Subcategory.create({ subcategory_name, category_id });

    const subcategories = await Subcategory.findOne({ subcategory_name });

    if (subcategories) {
      res.status(201).send({ message: "Category created successfully" });
    } else {
      res
        .status(400)
        .send({ message: `The category ${subcategory_name} already exists` });
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal server error" });
  }
};
exports.listSubcategories = async function (req, res,next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;

    const subcategories = await Subcategory.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "categories",
        },
      },{
        
          $skip: startIndex,
        
      },{
        
          $limit: perPage,
      }
    ]);
    res.status(200).send(subcategories);
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal server error" });
  }
};
exports.searchSubcategories = async function (req, res,next) {
  try {
    const query = req.query.query || "";
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;

    const subcategories = await Subcategory.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "categorie",
        },
      },
      {
        $unwind: "$categorie",
      },
      {
        $match: {
          subcategory_name: { $regex: query, $options: "i" },
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: perPage,
      },
    ]);

    res.status(200).send(subcategories);
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal server error" });
  }
};
exports.idSubcategories = async function (req, res,next) {
  try {
    const { id } = req.params;
    const subcategorie = await Subcategory.findById(id).populate({
      path: "category_id",
      select: "category_name",
    });
    if (!subcategorie) {
      return res
        .status(401)
        .json({ error: "No subcategory found with the provided ID" });
    }
    res.status(200).json(subcategorie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateSubcategories = async function (req, res,next) {
  const { id } = req.params;
  const { subcategory_name, category_id, active } = req.body;

  try {
    const existingSubcategorie = await Subcategory.findOne({
      subcategory_name,
      _id: { $ne: id },
    });

    if (existingSubcategorie) {
      return res.status(400).json({ error: "Subcategory name already exists" });
    }

    const updatedSubcategorie = await Subcategory.findByIdAndUpdate(
      id,
      {
        subcategory_name,
        category_id,
        active,
      },
      { new: true }
    );

    if (!updatedSubcategorie) {
      return res
        .status(404)
        .json({ error: "No subcategory found with the provided ID" });
    }

    res
      .status(200)
      .json({
        message: "Subcategory updated successfully",
        updatedSubcategorie,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteSubcategories = async function (req, res,next) {

  const categoryId = req.params.id;
  try {
    const Subcategorie = await Subcategory.findById(categoryId);

    if (!Subcategorie) {
      return res.status(404).json({ status: 404, message: 'ID de subcatégorie invalide' });
    }

 
    const product = await Product.find({ subcategory_id: categoryId });
    if (product.length > 0) {
      return res.status(400).json({
        status: 400,
        message: 'Impossible de supprimer cette subcategorie, des sous-product y sont attachées',
      });
    }

    await Subcategorie.deleteOne();

    res.status(200).json({ status: 200, message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Erreur interne du serveur' });
  }
};
