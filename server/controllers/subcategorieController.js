const { categorie } = require('../models/Categorie');
const { subcategorie } = require('../models/Subcategorie');

exports.creatSubcategorie = async function (req, res) {
  const { subcategory_name, category_id } = req.body;

  try {
    await subcategorie.create({ subcategory_name, category_id });

    const subcategories = await categorie.findOne({ subcategory_name });

    if (subcategories) {
      res.status(400).send({ message: `The category ${subcategory_name} already exists` });
    } else {
      res.status(201).send({ message: 'Category created successfully' });
    }

  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal server error' });
  }
};
    



exports.listSubcategories = async function (req, res) {
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
    res.status(200).send(subcategories);
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal server error' });
  }
};

exports.searchSubcategories = async function (req, res) {
  try {
    const query = req.query.query || '';
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;

    const subcategories = await subcategorie.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categorie',
          foreignField: '_id',
          as: 'categorie',
        },
      },
      {
        $unwind: '$categorie',
      },
      {
        $match: {
          subcategory_name: { $regex: query, $options: 'i' },
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: perPage,
      },
    ]);

    res.status(200).send(subcategories);
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal server error' });
  }
};

exports.idSubcategories = async function (req,res){
  try {
    const subcategorie = await subcategorie.findById(req.params.id);
    if (!subcategorie) {
      return res.status(401).json({ error: 'No subcategory found with the provided ID' });
    }

    const categorie = await categorie.findById(subcategorie.category_id);
    if (!categorie) {
      return res.status(500).json({ error: 'Associated category not found' });
    }

    const response = {
      id: subcategory._id,
      name: subcategory.name,
      category_name: category.name,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.updateSubcategories = async function (req,res){
  const { id } = req.params;
  const { subcategoryName, categoryId, active } = req.body;

  try {
    const existingSubcategorie = await subcategorie.findOne({ subcategoryName, _id: { $ne: id } });

    if (existingSubcategorie) {
      return res.status(400).json({ error: 'Subcategory name already exists' });
    }

    const updatedSubcategorie = await subcategorie.findByIdAndUpdate(id, {
      subcategoryName,
      categoryId,
      active,
    }, { new: true });

    if (!updatedSubcategorie) {
      return res.status(404).json({ error: 'No subcategory found with the provided ID' });
    }

    res.status(200).json({ message: 'Subcategory updated successfully', updatedSubcategorie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}
exports.deleteSubcategories = async function (req,res){
  const { id } = req.params;

  try {
    const subcategorie = await Subcategorie.findById(id).populate('products');

    if (!subcategorie) {
      return res.status(404).json({ error: 'No subcategory found with the provided ID' });
    }

    if (subcategorie.products.length > 0) {
      return res.status(400).json({ message: 'Products attached, cannot delete this subcategory' });
    }

    await subcategorie.remove();

    res.status(204).end(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}