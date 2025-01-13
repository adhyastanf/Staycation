import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Category from './category.js';
import Type from './type.js';
import slugify from 'slugify';

const Hotel = sequelize.define('Hotel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bedroom: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  livingRoom: {
    type: DataTypes.INTEGER,
    field: 'living_room',
    allowNull: false,
    defaultValue: 0,
  },
  bedroom: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  bathroom: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  diningRoom: {
    type: DataTypes.INTEGER,
    field: 'dining_room',
    allowNull: false,
    defaultValue: 0,
  },
  wifi: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  unit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  refigrator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  television: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  isPopular: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Category.hasOne(Hotel, { foreignKey: 'categoryId' });
Hotel.belongsTo(Category, { foreignKey: 'categoryId' });

Type.hasOne(Hotel, { foreignKey: 'typeId' });
Hotel.belongsTo(Type, { foreignKey: 'typeId' });

Hotel.afterCreate(async (hotel) => {
  const slug = slugify(`${hotel.title}-${hotel.id}`, {
    lower: true, // Slug dalam huruf kecil
    strict: true, // Hanya karakter alfanumerik dan tanda hubung
  });

  // Perbarui slug dengan nama + ID
  hotel.slug = slug;
  await hotel.save();
});

Hotel.afterUpdate(async (hotel) => {
  hotel.slug = slugify(`${hotel.title}-${hotel.id}`, { lower: true, strict: true });

  await hotel.save();
});

export default Hotel;
