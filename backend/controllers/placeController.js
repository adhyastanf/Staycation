import { cloudinary } from '../helpers/cloudinary-config.js';
import Category from '../model/Category.js';
import Hotel from '../model/hotel.js';
import Type from '../model/type.js';

const viewHotels = async (req, res) => {
  const { category } = req.query;
  const condition = {};
  if(category){
    condition.categoryId = parseInt(category)
  }
  
  try {
    const hotels = await Hotel.findAll({
      include: [
        {
          model: Category,
          attributes: ['category'],
        },
        {
          model: Type,
          attributes: ['type'],
        },
      ],
      attributes: ['title', 'img_url', 'id'],
      where: condition,
    });

    const formattedHotels = hotels.map((hotel) => ({
      title: hotel.title,
      img_url: hotel.img_url,
      description: hotel.description,
      id: hotel.id,
      category: hotel.Category.category || null,
      type: hotel.Type.type || null,
    }));

    return res.status(200).json({
      code: res.statusCode,
      msg: 'Get hotels successfully',
      data: formattedHotels,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const viewSingleHotel = async (req, res) => {
  const { productId } = req.params;
  try {
    const hotel = await Hotel.findByPk(productId);
    return res.status(200).json({
      code: res.statusCode,
      msg: 'Get hotel successfully',
      data: hotel,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const updateHotel = async (req, res) => {
  const path = req?.file?.path;
  const { productId } = req.params;

  let updateData;

  try {
    updateData = { ...req.body, typeId: req.body.type, categoryId: req.body.category };
    if (path) {
      const uploader = async (path) => await cloudinary(path, 'Images');
      const img = await uploader(path);
      updateData = { ...req.body, img_url: img.url, typeId: req.body.type, categoryId: req.body.category };
    }
    await Hotel.update(updateData, { where: { id: productId } });
    return res.status(200).json({
      code: res.statusCode,
      msg: 'Update hotel successfully',
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const deleteHotel = async (req, res) => {
  const { name, id } = req.body;

  try {
    await Hotel.destroy({
      name,
      id,
    });

    return res.status(200).json({
      code: res.statusCode,
      msg: 'Hotel has successfully delete',
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

export { viewHotels, viewSingleHotel };
