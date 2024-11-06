const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const MealPlan = require('./MealPlan');
const Food = require('./Food');

const PlannedMeal = sequelize.define('PlannedMeal', {
  planned_meal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  meal_plan_id: {
    type: DataTypes.INTEGER,
    references: {
      model: MealPlan,
      key: 'meal_plan_id'
    }
  },
  food_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Food,
      key: 'food_id'
    }
  },
  serving_size: {
    type: DataTypes.DECIMAL(5, 2)
  },
  meal_type: {
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack')
  },
  meal_time: {
    type: DataTypes.TIME
  },
  day_of_week: {
    type: DataTypes.ENUM(
      'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    )
  }
}, {
  timestamps: false
});

MealPlan.hasMany(PlannedMeal, { foreignKey: 'meal_plan_id', onDelete: 'CASCADE' });
PlannedMeal.belongsTo(MealPlan, { foreignKey: 'meal_plan_id' });
Food.hasMany(PlannedMeal, { foreignKey: 'food_id', onDelete: 'RESTRICT' });
PlannedMeal.belongsTo(Food, { foreignKey: 'food_id' });

module.exports = PlannedMeal;