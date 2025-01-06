import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Guest from './guest.js';

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
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
    allowNull: false,
  },
  snap_redirect_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Guest.hasMany(Transaction, { foreignKey: 'guestId' });
Transaction.belongsTo(Guest, { foreignKey: 'guestId' });

export default Transaction;
