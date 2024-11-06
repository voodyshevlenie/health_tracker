// db.js
const { Sequelize } = require('sequelize');

// Настройки подключения к базе данных
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

module.exports = sequelize; // Экспортируем экземпляр Sequelize