import Category from '../model/Category.js';

const createCategory = async (req, res) => {
  const { category } = req.body;

  try {
    await Category.create({
      category,
    });

    return res.status(200).json({
      code: res.statusCode,
      msg: 'Category has successfully created',
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const {categoryId} = req.params
  const body = req.body;
  try {
    const hotel = await Category.update(body, { where: { id: categoryId } });
    return res.status(200).json({
      code: res.statusCode,
      msg: 'Hotel has been updated',
      data: hotel,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const viewCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    return res.status(200).json({
      code: res.statusCode,
      msg: 'Get Category successfully',
      data: category,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { category, id } = req.body;
  try {
    const category = await Category.destroy({
      where: { category, id },
    });
    return res.status(200).json({
      code: res.statusCode,
      msg: 'Get Category successfully',
      data: category,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

export { createCategory, updateCategory, viewCategory, deleteCategory };
