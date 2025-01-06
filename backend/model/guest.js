import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Hotel from './hotel.js';
import User from './user.js';

const Guest = sequelize.define('Guest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Hotel.hasMany(Guest, { foreignKey: 'hotelId' });
Guest.belongsTo(Hotel, { foreignKey: 'hotelId' });

User.hasMany(Guest, { foreignKey: 'userId' });
Guest.belongsTo(User, { foreignKey: 'userId' });

export default Guest;
