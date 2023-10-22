const {subcategorie} = require('../models/Subcategorie');



exports.creatSubcategorie = async function (req,res){
    const {subcategory_name, category_id} = req.body
    try {
        await subcategorie.create({subcategory_name, category_id})
        const subcategories = categorie.findOne({subcategory_name});
        if(subcategories){
        res.status(400).send({message: `the category ${subcategory_name} already exist`})
        };
        res.status(201).send({ message: 'category created successfully' })
        ;
    } catch (error) {
        res.status(500).send({ status: 500, message: 'Internal server error' });
    }
    }
    
exports.listSubcategories = async function (req,res){

}
exports.searchSubcategories = async function (req,res){

}
exports.idSubcategories = async function (req,res){

}
exports.updateSubcategories = async function (req,res){

}
exports.deleteSubcategories = async function (req,res){

}