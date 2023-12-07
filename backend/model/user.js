import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      args: true,
      msg: 'Username is already exist',
    },
    validate: {
      notNull: { msg: 'Name is required' },
    },
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email is already exist',
    },
    validate: {
      notNull: { msg: 'Name is required' },
      isEmail: { msg: 'Please enter a valid email' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Password is required' },
    },
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: { msg: 'firstname is required' },
    },
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: { msg: 'lastname is required' },
    },
  },
});

export default User;
