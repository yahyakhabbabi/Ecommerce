const { categorie } = require('../models/Categorie');
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
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const startIndex = (page - 1) * perPage;

        const subcategories = await subcategorie.aggregate([
            {
                $lookup: {
                  from: 'categories', 
                  localField: 'category',
                  foreignField: '_id',
                  as: 'category',
                },
              },
              {
                $unwind: '$category',
              },
              {
                $skip: startIndex,
              },
              {
                $limit: perPage,
              },
            ]);
            return res.status(200).send(subcategorie)
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
    


    }


exports.searchSubcategories = async function (req,res){
    try {
        const query = req.query.query || '';
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const startIndex = (page - 1) * perPage;

        const subcategories = await subcategorie.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categorie",
                    foreignField: "_id",
                    as: "categotrie"
                },
            },
            {
                $unwind: "$categorie",
            },
            {
                $match: {
                    subcategoryName: { $regex: query, $options: 'i' },
                },
            },
            {
                $skip: startIndex,
              },
              {
                $limit: perPage,
              },
            ]);

            res.status(200).json(subcategories);
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  };
exports.idSubcategories = async function (req,res){
  
}
exports.updateSubcategories = async function (req,res){

}
exports.deleteSubcategories = async function (req,res){

}