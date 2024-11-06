const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  notification_id: {
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
  message: {
    type: DataTypes.TEXT
  },
  read_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

User.hasMany(Notification, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Notification;