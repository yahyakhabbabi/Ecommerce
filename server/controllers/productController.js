
const { Product } = require("../models/Product");

  
exports.createProduct = async function (req, res,next) {
  try {
    const {
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
    } = req.body;
    const [existingsku, existingproduct_name] = await Promise.all([
      Product.findOne({ sku }),
      Product.findOne({ product_name }),
    ]);

    if (existingsku) {
      return res.status(400).json({ error: "sku already exists" });
    }

    if (existingproduct_name) {
      return res.status(400).json({ error: "product_name already exists" });
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
      return res.status(403).send({ error: "you don't have enough privilege" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.allProducts = async function (req, res,next) {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const product = await Product.aggregate([
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
          short_description: 1,
          price: 1,
          discount_price: 1,
          options: 1,
          active: 1,
        },
      },
    ]);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.searchProduct = async function (req, res,next) {
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
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
exports.productById = async function (req, res,next) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate({
      path: "subcategory_id",
      select: "subcategory_name",
    });
    if (!product) {
      return res
        .status(401)
        .json({ error: "No product found with the provided ID" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateProduct = async function (req, res,next) {
  try {
    const { id } = req.params;
    const { body } = req;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const existingProduct = await Product.findOne({
      product_name: body.product_name,
    });

    if (existingProduct && existingProduct._id.toString() !== id) {
      return res.status(400).json({ error: "Product_name already exists" });
    }

    await Product.updateOne({ _id: id }, { $set: body });

    res.status(200).json("Product updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async function (req, res) {
  const id = req.params.id;
  if(!id){
    return res.status(204).json({message:"enter a valid id"});
  }
  try {
    const deleteProduct= await Product.findOneAndDelete({_id:id});
    if (!deleteProduct){
      return res.status(404).json({ message: "product not found"})
    }
    res.status(200).json({message:"product deleted successfully","data":deleteProduct});
  } catch (error) {
    res.status(500).json(error);
  }
  
  }