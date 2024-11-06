const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const MealPlan = sequelize.define('MealPlan', {
  meal_plan_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  plan_name: {
    type: DataTypes.STRING(255)
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: false
});

User.hasMany(MealPlan, { foreignKey: 'user_id', onDelete: 'CASCADE' });
MealPlan.belongsTo(User, { foreignKey: 'user_id' });

module.exports = MealPlan;