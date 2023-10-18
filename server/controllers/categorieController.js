const categorie = require('../models/Categorie');




exports.creatCategorie = async function (req,res){
   const {categorieName} = req.body;
   try{
    const {categorie} = await categorie.create({categorieName})
    res.status(201).json({ message: 'category created successfully' });
   } catch (error) {
    res.status(400).json({message: "the category xxxxx already exist"});
   }
   
    
}

exports.listCategories = async function (req,res){
    
}

exports.searchCategories = async function (req,res){
    

}

exports.idCategories = async function (req,res){

    const { id } = req.params;

    const categorie = await Categorie.findById(id)

    if (!categorie){
        return res.status(404).json({message: "category not found"})
    }
    res.status(200).send(categorie);

}

exports.updateCategories = async function (req,res){

}

exports.deleteCategories = async function (req,res){
    const categorie = await Categorie.findOneAndDelete({_id:id})
    
    if (!categorie) {
        return res.status(404).json({message: "category not found"})
    }

}
