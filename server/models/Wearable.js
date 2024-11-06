const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Wearable = sequelize.define('Wearable', {
  wearable_id: {
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
  brand: {
    type: DataTypes.STRING(50)
  },
  model: {
    type: DataTypes.STRING(100)
  },
  serial_number: {
    type: DataTypes.STRING(20),
    unique: true
  },
  sync_frequency: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly')
  }
}, {
  timestamps: true
});

User.hasMany(Wearable, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Wearable.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Wearable;