import { cloudinary } from '../helpers/cloudinary-config.js';
import Category from '../model/Category.js';
import Hotel from '../model/hotel.js';
import Type from '../model/type.js';

const viewHotels = async (req, res) => {
  const { category } = req.query;
  const condition = {};
  if (category) {
    condition.categoryId = parseInt(category);
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
      attributes: ['title', 'img_url', 'id', 'slug'],
      where: condition,
    });

    const formattedHotels = hotels.map((hotel) => ({
      title: hotel.title,
      img_url: hotel.img_url,
      description: hotel.description,
      id: hotel.id,
      category: hotel.Category.category || null,
      type: hotel.Type.type || null,
      slug: hotel.slug,
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
  const { slug } = req.params;
  try {
    const hotel = await Hotel.findOne({ where: { slug } });

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

export { viewHotels, viewSingleHotel };
