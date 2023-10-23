const {Product} = require('../models/Product')

exports.createProduct = async function(req,res){
    const {sku,product_image,product_name,subcategory_id,short_description,long_description,
      price,quantity,discount_price,options}= req.body;
    const [existingsku, existingproduct_name] = await Promise.all([
      Product.findOne({ sku }),
      Product.findOne({ product_name })
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
        options
     })
     const result = await product.save();
     if(result){
        res.status(201).json("product created succesfuly")
     }else{
        return res.status(403).send({ error: "you don't have enough privilege" });
     }
}
exports.allProducts = async function(req,res){
    try { 
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page-1)*limit;
        const product = await Product.aggregate([
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
            {
              $lookup: {
                from: 'Subcategory', 
                localField: 'subcategory_id',
                foreignField: '_id',
                as: 'subcategory',
              },
            },
            {
              $unwind: '$subcategory',
            },
            {
              $project: {
                _id: 1,
                sku: 1,
                product_image: 1,
                product_name: 1,
                categoryName: '$subcategory.category_name',
                short_description: 1,
                price: 1,
                discount_price: 1,
                options: 1,
                active: 1,
              },
            },
          ]);
        

        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json(error);
    }    
}
exports.searchProduct = async function(req,res){
    try {
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const query = req.query.query || '';
    
        const products = await Product.aggregate([
          {
            $match: {
              $text: {
                $search: query,
              },
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
              from: 'Subcategory', 
              localField: 'subcategory_id',
              foreignField: '_id',
              as: 'subcategory',
            },
          },
          {
            $unwind: '$subcategory',
          },
          {
            $project: {
              _id: 1,
              sku: 1,
              product_image: 1,
              product_name: 1,
              subcategory_id:1,
              subcategory_name: '$subcategory.category_name',
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
        res.status(500).json(error);
      }
    }
exports.productById = async function(req,res){
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(product){
            res.status(200).json(product);
        }else{
            res.status(404).json('product not found')
        }
    } catch (error) {
        res.status(500).json(error);
    }
    
}
exports.updateProduct = async function (req, res) {
    try {
        const { id } = req.params;
        const { body } = req;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const existingProduct = await Product.findOne({ product_name: body.product_name });

        if (existingProduct && existingProduct._id.toString() !== id) {
            return res.status(400).json({ error: 'Product_name already exists' });
        }

        await Product.updateOne({ _id: id }, { $set: body });

        res.status(200).json('Product updated successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.deleteProduct = async function(req,res){
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id });
    
        if (!product) {
          return res.status(404).json('product not found');
        }
    
        await product.deleteOne();
    
        return res.status(200).json('product deleted successfully');
      } catch (error) {
        return res.status(500).json(error);
      }
}