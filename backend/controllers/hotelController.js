import { cloudinary } from '../helpers/cloudinary-config.js';
import Category from '../model/Category.js';
import Hotel from '../model/hotel.js';
import Type from '../model/type.js';

const createHotel = async (req, res) => {
  const { title, description, category, city, country, type, price, bedroom, livingroom, bathroom, diningroom, wifi, unit, refigrator, television } = req.body;
  const path = req.file.path;

  try {
    const uploader = async (path) => await cloudinary(path, 'Images');
    const img = await uploader(path);
    const hotel = await Hotel.create({
      title,
      description,
      city,
      country,
      typeId: type,
      price,
      categoryId: category,
      img_url: img.url,
      bedroom: bedroom || null,
      livingRoom: livingroom || null,
      bathroom: bathroom || null,
      diningRoom: diningroom || null,
      wifi: wifi || null,
      unit: unit || null,
      refigrator: refigrator || null,
      television: television || null,
      isPopular: false,
    });

    return res.status(200).json({
      code: res.statusCode,
      msg: 'Hotel has succesfullly booked',
      data: hotel,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const viewHotels = async (req, res) => {

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
    });

    const formattedHotels = hotels.map((hotel) => ({
      name: hotel.title,
      id: hotel.id,
      category: hotel.categoryId ? hotel.Category.category : null,
      type: hotel?.typeId ? hotel.Type.type : null,
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

const getSingleHotel = async (req, res) => {
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
  const { title, id } = req.body;

  try {
    await Hotel.destroy({
      title,
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

export { createHotel, updateHotel, viewHotels, getSingleHotel, deleteHotel };
