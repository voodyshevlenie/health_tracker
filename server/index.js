
require('dotenv').config();
const express = require('express');
const sequelize = require('./db'); // Импортируем экземпляр Sequelize
const PORT = process.env.PORT;

const app = express();

const start = async () => {
    try {
        const connection = await sequelize.authenticate(); // Проверяем соединение с базой данных
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: true }); // Синхронизируем модели с базой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

start();