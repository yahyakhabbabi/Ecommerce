const {Product} = require('../models/Product')

exports.createProduct = async function(req,res){
    const {sku,product_image,product_name,subcategory_id,short_description,long_description,price,quantity,discount_price,options}= req.body;
    const [existingsku, existingproduct_name] = await Promise.all([
        Users.findOne({ sku }),
        Users.findOne({ product_name })
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
    
}
exports.searchProduct = async function(req,res){
    
}
exports.productById = async function(req,res){
    
}
exports.updateProduct = async function(req,res){
    
}
exports.deleteProduct = async function(req,res){
    
}