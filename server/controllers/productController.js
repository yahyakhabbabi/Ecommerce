const { Product } = require("../models/Product");
const mongoose = require("mongoose");

exports.createProduct = async function (req, res, next) {
  try {
    const {
      sku,
      product_name,
      subcategory_id,
      short_description,
      long_description,
      price,
      quantity,
      discount_price,
      options,
    } = req.body;
    const product_image = req.file ? req.file.path : null;
    console.log("req file ", req.file);
    const [existingsku, existingproduct_name] = await Promise.all([
      Product.findOne({ sku }),
      Product.findOne({ product_name }),
    ]);

    if (existingsku) {
      const error = new Error("sku already exists");
      error.statusCode = 400;
      throw error;
    }

    if (existingproduct_name) {
      const error = new Error("product_name already exists");
      error.statusCode = 400;
      throw error;
    }
    const product = new Product({
      sku,
      product_image,
      product_name,
      subcategory_id,
      short_description,
      long_description,
      price,
      quantity,
      discount_price,
      options,
    });
    const result = await product.save();
    if (result) {
      res.status(201).json("product created succesfuly");
    } else {
      const error = new Error("you don't have enough privilege");
      error.statusCode = 403;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// exports.allProducts = async function (req, res, next) {
//   try {
//     const page = req.query.page || 1;
//     const limit = 10;
//     const skip = (page - 1) * limit;
//     const product = await Product.aggregate([
//       {
//         $lookup: {
//           from: "subcategories",
//           localField: "subcategory_id",
//           foreignField: "_id",
//           as: "subcategory",
//         },
//       },
//       {
//         $skip: skip,
//       },
//       {
//         $limit: limit,
//       },
//       {
//         $project: {
//           _id: 1,
//           sku: 1,
//           product_image: 1,
//           product_name: 1,
//           categoryName: "$subcategory.subcategory_name",
//           subcategoryid: "$subcategory._id",
//           short_description: 1,
//           price: 1,
//           discount_price: 1,
//           active: 1,
//           options: 1

//         },
//       },
//     ]);

//     res.status(200).json(product);
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

exports.searchProduct = async function (req, res, next) {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const query = req.query.query || "";

    const products = await Product.aggregate([
      {
        $match: {
          product_name: { $regex: query, $options: "i" },
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory_id",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $project: {
          _id: 1,
          sku: 1,
          product_image: 1,
          product_name: 1,
          subcategory_id: 1,
          subcategory_name: "$subcategory.subcategory_name",
          short_description: 1,
          price: 1,
          discount_price: 1,
          options: 1,
          active: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.productById = async function (req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate({
      path: "subcategory_id",
      select: "subcategory_name",
    });
    if (!product) {
      const error = new Error("No product found with the provided ID");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json(product);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;

    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    const existingProduct = await Product.findOne({
      product_name: body.product_name,
    });

    if (existingProduct && existingProduct._id.toString() !== id) {
      const error = new Error("Product_name already exists");
      error.statusCode = 400;
      throw error;
    }

    await Product.updateOne({ _id: id }, { $set: body });

    res.status(200).json("Product updated successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deleteProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      const error = new Error("product not found");
      error.statusCode = 404;
      throw error;
    }

    await product.deleteOne();

    return res.status(200).json("product deleted successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.allProducts = async function (req, res, next) {
  console.log("GET / handler in productRoutes reached");
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    // Nested route
    // GET /v1/subcategories/products
    let filterObject = {};
    if (req.params.subcategoryId)
      filterObject = {
        subcategory_id: new mongoose.Types.ObjectId(req.params.subcategoryId),
      };

    const product = await Product.aggregate([
      {
        $match: filterObject,
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory_id",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 1,
          sku: 1,
          product_image: 1,
          product_name: 1,
          categoryName: "$subcategory.subcategory_name",
          subcategoryid: "$subcategory.subcategory._id",
          short_description: 1,
          price: 1,
          discount_price: 1,
          active: 1,
          options: 1,
        },
      },
    ]);

    res.status(200).json(product);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
