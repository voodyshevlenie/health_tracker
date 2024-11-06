const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Report = sequelize.define('Report', {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER
  }, // Необязательная связь с пользователем
  report_type: {
    type: DataTypes.ENUM('activity_summary', 'nutrition_summary', 'sleep_analysis')
  },
  period_start: {
    type: DataTypes.DATE
  },
  period_end: {
    type: DataTypes.DATE
  },
  summary: {
    type: DataTypes.TEXT
  },
  detailed_report: {
    type: DataTypes.JSONB // Используем JSONB для хранения сложных структур данных
  },
  generated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

User.hasMany(Report, { foreignKey: 'user_id', onDelete: 'SET NULL' });
Report.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Report;