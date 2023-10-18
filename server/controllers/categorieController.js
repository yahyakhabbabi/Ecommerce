const {categorie} = require('../models/Categorie');




exports.creatCategorie = async function (req,res){
   const {category_name} = req.body;
   try{
    await categorie.create({category_name})
    const categories = categorie.findOne({category_name});
    if(!categories){
    res.status(400).json({message: "the category xxxxx already exist"})
    };
    res.status(201).json({ message: 'category created successfully' })
    ;
   } catch (error) {
    res.status(500).send(error)
   
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
