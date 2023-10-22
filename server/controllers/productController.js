const Product = require('../models/Product')
const Products = require('../models/Product');
const {v4:uuidv4}=require('uuid')

exports.createProduct = async function (req, res) {
    try {
        const { sku, product_image, product_name, subcategory_id, short_description, long_description, price, quantity, discount_price, options } = req.body
        const createdProduct = await Products.create({
            id:uuidv4(),
            sku,
            product_image,
            product_name,
            subcategory_id,
            short_description,
            long_description,
            price,
            quantity,
            discount_price,
            options
        })
        console.log(createdProduct)
        res.status(201).json({ "message": "product created successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.allProducts = async function (req, res) {
    try {
        const page = req.query.page || 1;
        const elementsPerPage = 10;
        const skip = (page - 1) * elementsPerPage;
        const productsList = await Products.find().skip(skip).limit(elementsPerPage);
        res.status(200).json(productsList);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.searchProduct = async function (req, res) {
    try {
        const { query, page } = req.query;
       //displaying 10 elements per page
        const elementsPerPage = 10;
        const skip = (page - 1) * elementsPerPage;
        //regular expression to find an occurence of query in the products name existing in the database
        const regex = new RegExp(query, "i");
        const findProduct = await Product.find({
            "product_name": regex
        }).skip(skip).limit(elementsPerPage);

        res.status(200).json(findProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.productById = async function (req, res) {
    try {
      const id = req.params.id; 
      const findProductById = await Products.findOne({ id });
      
      if (findProductById) {
        res.status(200).json(findProductById);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  exports.updateProduct = async function (req, res) {
    const id = req.params.id;
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
  
    // Check if any of the required fields are missing
    if (!sku || !product_name || !price) {
      return res.status(204).json({ message: "sku, product_name, subcategory_id, and price are required fields" });
    }
  
    // Check if product_name is not unique
    const existingProduct = await Product.findOne({
      product_name,
      "id": { $ne: id },
    });
  
    if (existingProduct) {
      return res.status(400).json({ message: "The product name should be unique" });
    }
  
    try {
      // Update the product
      const updatedProduct = await Product.findOneAndUpdate(
        {id:id},
        {
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
        },
          {new:true}
        
      );
  
      if (updatedProduct) {
        res.status(200).json({ "message": "Product updated successfully", data: updatedProduct });
      } else {
        res.status(404).json({ "message": "invalid product id"});
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
exports.deleteProduct = async function (req, res) {
const id = req.params.id;
if(!id){
  return res.status(204).json({"message":"enter a valid id"});
}
try {
  const deleteProduct= await Product.findOneAndDelete({id:id});
  if (!deleteProduct){
    return res.status(404).json({ "message": "invalid product id"})
  }
  res.status(200).json({"message":"product deleted successfully","data":deleteProduct});
} catch (error) {
  res.status(500).json(error);
}

}