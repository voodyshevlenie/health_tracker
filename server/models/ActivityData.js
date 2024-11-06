const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Wearable = require('./Wearable');

const ActivityData = sequelize.define('ActivityData', {
  activity_data_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  wearable_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Wearable,
      key: 'wearable_id'
    }
  },
  timestamp: {
    type: DataTypes.DATE
  },
  steps: {
    type: DataTypes.INTEGER
  },
  distance: {
    type: DataTypes.DECIMAL(7, 2)
  },
  calories_burned: {
    type: DataTypes.INTEGER
  },
  heart_rate: {
    type: DataTypes.INTEGER
  },
  sleep_duration: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: true
});

Wearable.hasMany(ActivityData, { foreignKey: 'wearable_id', onDelete: 'CASCADE' });
ActivityData.belongsTo(Wearable, { foreignKey: 'wearable_id' });

module.exports = ActivityData;