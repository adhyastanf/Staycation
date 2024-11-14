import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Hotel from './hotel.js';
import User from './user.js';

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  bookingStartDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bookingEndDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  snap_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  snap_redirect_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  night: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Hotel.hasOne(Transaction, { foreignKey: 'product_id' });
Transaction.belongsTo(Hotel, { foreignKey: 'product_id' });

User.hasOne(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

export default Transaction;
