const { categorie } = require("../models/Categorie");




exports.creatCategorie = async function (req,res){
   const {category_name} = req.body;
   try{
    await categorie.create({category_name})
    const categories = categorie.findOne({category_name});
    if(!categories){
    res.status(400).json({message: `the category ${category_name} already exist`})
    };
    res.status(201).send({ message: 'category created successfully' })
    ;
   } catch (error) {
    res.status(500).send(error)
   
   }
   
    
}

exports.listCategories = async function (req,res){
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const startIndex = (page - 1) * perPage;
  
        const categories = await categorie.find()
          .skip(startIndex)
          .limit(perPage);
  
        res.status(200).send(categories);
      } catch (error) {
        res.status(500).send({ error: 'Server error' });
      }
    
    
}

exports.searchCategories = async function (req,res){
    try {
        const query = req.query.query || '';
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const startIndex = (page - 1) * perPage;
  
        const regex = new RegExp(query, 'i');
        const categories = await categorie.find({ category_name: regex })
          .skip(startIndex)
          .limit(perPage);
  
        res.status(200).send(categories);
      } catch (error) {
        res.status(500).send({ error: 'Server error' });
      }


    

}

exports.idCategories = async function (req,res){
    try {
        const { id } = req.params;

    const categorie = await Categorie.findById(id)

    if (!categorie){
        return res.status(404).send({message: "category not found"})

exports.creatCategorie = async function (req, res) {
  const { category_name } = req.body;
  try {
    await categorie.create({ category_name });
    const categories = categorie.findOne({ category_name });
    if (!categories) {
      res
        .status(400)
        .json({ message: `the category ${category_name} already exist` });

    }
    res.status(201).send({ message: "category created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.listCategories = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;

    const categories = await categorie.find().skip(startIndex).limit(perPage);

    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

exports.searchCategories = async function (req, res) {
  try {
    const query = req.query.query || "";
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;

    const regex = new RegExp(query, "i");
    const categories = await categorie
      .find({ category_name: regex })
      .skip(startIndex)
      .limit(perPage);

    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

exports.idCategories = async function (req, res) {
  try {
    const { id } = req.params;
    const category = await categorie.findById(id);

    if (!category) {
      return res.status(404).send({ message: "category not found" });
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCategories = async function (req, res) {
  try {
    const { id } = req.params;
    const { category_name, active } = req.body;
    const category = await categorie.findById(id);

exports.updateCategories = async function (req, res) {
  try {
    const { id } = req.params;
    const { category_name, active } = req.body;
    const category = await categorie.findById(id);

    if (!category) {
      return res
        .status(404)
        .send({ status: 404, message: "ID de catégorie invalide" });
    }

    const checkCategoryName = await categorie.findOne({
      _id: id,
      category_name: category_name,
    });

    if (checkCategoryName) {
      return res.status(400).send("Le nom de catégorie existe déjà");
    }

    const result = await categorie.findOneAndUpdate(
      { _id: id },
      { category_name: category_name, active: active },
      {
        new: true,
      }
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ status: 500, message: "Erreur interne du serveur" });
  }
};


exports.deleteCategories = async function (req, res) {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );

    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid category id" });
    }

    const userRole = req.user.role;
    if (userRole !== "admin" && userRole !== "manager") {
      return res
        .status(403)
        .json({ status: 403, message: "You don't have enough privilege" });
    }

    if (category.subcategories.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Subcategories attached, cannot delete this category",
      });
    }

    await category.remove();

    res
      .status(200)
      .json({ status: 200, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
