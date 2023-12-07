const { categorie } = require("../models/Categorie");
const { Subcategory } = require("../models/Subcategorie");

exports.creatCategorie = async function (req, res, next) {
  const { category_name } = req.body;
  try {
    await categorie.create({ category_name });
    const categories = categorie.findOne({ category_name });
    if (!categories) {
      res
        .status(400)
        .json({ message: `the category ${category_name} already exist` });
    }
    res.status(201).send({ message: "category created successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.listCategories = async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;

    const categories = await categorie.find().skip(startIndex).limit(perPage);

    res.status(200).send(categories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.searchCategories = async function (req, res, next) {
  try {
    const query = req.query.query || "";
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;

    const regex = new RegExp(query, "i");
    const categories = await categorie
      .find({ category_name: regex })
      .skip(startIndex)
      .limit(perPage);

    res.status(200).send(categories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.idCategories = async function (req, res, next) {
  try {
    const { id } = req.params;
    const category = await categorie.findById(id);

    if (!category) {
      return res.status(404).send({ message: "category not found" });
    }
    res.status(200).send(category);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateCategories = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { category_name, active } = req.body;
    const category = await categorie.findById(id);

    if (!category) {
      return res
        .status(404)
        .send({ status: 404, message: "ID de catégorie invalide" });
    }

    const checkCategoryName = await categorie.findOne({
      _id: id,
      category_name: category_name,
    });

    if (checkCategoryName) {
      return res.status(400).send("Le nom de catégorie existe déjà");
    }

    const result = await categorie.findOneAndUpdate(
      { _id: id },
      { category_name: category_name, active: active },
      {
        new: true,
      }
    );

    res.status(200).send(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deleteCategories = async function (req, res, next) {
  const categoryId = req.params.id;
  try {
    const category = await categorie.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "ID de catégorie invalide" });
    }

    const subcategories = await Subcategory.find({ category_id: categoryId });
    if (subcategories.length > 0) {
      return res.status(400).json({
        status: 400,
        message:
          "Impossible de supprimer cette catégorie, des sous-catégories y sont attachées",
      });
    }

    await category.deleteOne();

    res
      .status(200)
      .json({ status: 200, message: "Catégorie supprimée avec succès" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};