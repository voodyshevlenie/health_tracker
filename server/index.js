
require('dotenv').config();
const express = require('express');
const sequelize = require('./db'); // Импортируем экземпляр Sequelize
const User = require('./models/User')
const Wearable = require('./models/Wearable')
const ActivityData = require('./models/ActivityData')
const MealPlan = require('./models/MealPlan')
const Food = require('./models/Food')
const PlannedMeal = require('./models/PlannedMeal')
const Notification = require('./models/Notification')
const Report = require('./models/Report')
const cors = require('cors')
const PORT = process.env.PORT;



const app = express();
app.use(cors())
app.use(express.json())

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