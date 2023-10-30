const { Subcategory } = require("../models/Subcategorie");
const { Product } = require("../models/Product");
const { categorie } = require("../models/Categorie");

exports.creatSubcategorie = async function (req, res, next) {
  const { subcategory_name, category_id } = req.body;

  try {
    const checkCategorie = await categorie.findOne({ _id: category_id });
    if (!checkCategorie) {
      const error = new Error(
        "he doesn t existe any categorie with this categorie_id"
      );
      error.statusCode = 404;
      throw error;
    }
    await Subcategory.create({ subcategory_name, category_id });

    const subcategories = await Subcategory.findOne({ subcategory_name });

    if (subcategories) {
      res.status(201).send({ message: "Category created successfully" });
    } else {
      const error = new Error(
        `The category ${subcategory_name} already exists`
      );
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.listSubcategories = async function (req, res, next) {
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
      },
      {
        $skip: startIndex,
      },
      {
        $limit: perPage,
      },
    ]);
    res.status(200).send(subcategories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.searchSubcategories = async function (req, res, next) {
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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.idSubcategories = async function (req, res, next) {
  try {
    const { id } = req.params;
    const subcategorie = await Subcategory.findById(id).populate({
      path: "category_id",
      select: "category_name",
    });
    if (!subcategorie) {
      const error = new Error("No subcategory found with the provided ID");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json(subcategorie);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateSubcategories = async function (req, res, next) {
  const { id } = req.params;
  const { subcategory_name, category_id, active } = req.body;

  try {
    const existingSubcategorie = await Subcategory.findOne({
      subcategory_name,
      _id: { $ne: id },
    });

    if (existingSubcategorie) {
      const error = new Error("Subcategory name already exists");
      error.statusCode = 400;
      throw error;
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
      const error = new Error("No subcategory found with the provided ID");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Subcategory updated successfully",
      updatedSubcategorie,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deleteSubcategories = async function (req, res, next) {
  const categoryId = req.params.id;
  try {
    const Subcategorie = await Subcategory.findById(categoryId);

    if (!Subcategorie) {
      const error = new Error("ID de subcatégorie invalide");
      error.statusCode = 404;
      throw error;
    }

    const product = await Product.find({ subcategory_id: categoryId });
    if (product.length > 0) {
      const error = new Error(
        "Impossible de supprimer cette subcategorie, des sous-product y sont attachées"
      );
      error.statusCode = 404;
      throw error;
    }

    await Subcategorie.deleteOne();

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
