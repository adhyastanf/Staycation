import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Type = sequelize.define('Type', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Type;
