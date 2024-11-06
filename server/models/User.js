const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  password_hash: {
    type: DataTypes.CHAR(60),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(50)
  },
  last_name: {
    type: DataTypes.STRING(50)
  },
  date_of_birth: {
    type: DataTypes.DATE
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other')
  },
  height: {
    type: DataTypes.DECIMAL(5, 2)
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2)
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = User;