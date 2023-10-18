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
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const startIndex = (page - 1) * perPage;
  
        const categories = await Category.find()
          .skip(startIndex)
          .limit(perPage);
  
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    
    
}

exports.searchCategories = async function (req,res){
    try {
        const query = req.query.query || '';
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const startIndex = (page - 1) * perPage;
  
        const regex = new RegExp(query, 'i');
        const categories = await Category.find({ name: regex })
          .skip(startIndex)
          .limit(perPage);
  
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }


    

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
    const categoryId = req.params.id;
    const { categoryName, active } = req.body;

    try {
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({ status: 404, message: 'Invalid category id' });
      }

      
      const userRole = req.user.role; 
      if (userRole !== 'admin' && userRole !== 'manager') {
        return res.status(403).json({ status: 403, message: "You don't have enough privilege" });
      }

      category.categoryName = categoryName;
      category.active = active;

      await category.save();

      res.status(200).json({ status: 200, message: 'Category updated successfully' });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }

}

exports.deleteCategories = async function (req,res){
    const categoryId = req.params.id;

    try {
      const category = await Category.findById(categoryId).populate('subcategories');

      if (!category) {
        return res.status(404).json({ status: 404, message: 'Invalid category id' });
      }

      const userRole = req.user.role; 
      if (userRole !== 'admin' && userRole !== 'manager') {
        return res.status(403).json({ status: 403, message: "You don't have enough privilege" });
      }

      if (category.subcategories.length > 0) {
        return res.status(400).json({ status: 400, message: 'Subcategories attached, cannot delete this category' });
      }

      await category.remove();

      res.status(200).json({ status: 200, message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }

}
