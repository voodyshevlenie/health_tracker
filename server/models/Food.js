const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Food = sequelize.define('Food', {
  food_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  food_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  calories: {
    type: DataTypes.INTEGER
  },
  protein: {
    type: DataTypes.DECIMAL(5, 2)
  },
  carbs: {
    type: DataTypes.DECIMAL(5, 2)
  },
  fat: {
    type: DataTypes.DECIMAL(5, 2)
  }
}, {
  timestamps: false
});

module.exports = Food;