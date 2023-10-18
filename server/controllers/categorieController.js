const categorie = require('../models/Categorie');




exports.creatCategorie = async function (req,res){
   const {categorieName} = req.body;
   res.status(201).json({ message: 'category created successfully' });
    
}
exports.listCategories = async function (req,res){
    
}
exports.searchCategories = async function (req,res){
    const { id } = req.params

}
exports.idCategories = async function (req,res){

}
exports.updateCategories = async function (req,res){

}
exports.deleteCategories = async function (req,res){

}
