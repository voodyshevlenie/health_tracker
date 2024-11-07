const Router = require('express')
const router = new Router()

// Импортируем все маршрутизаторы
const userRouter = require('./routes/user.js');
const wearableRouter = require("./routes/wearable.js");
const activityDataRouter = require("./routes/activityData.js");
const mealPlanRouter = require("../routes/mealPlan.js");
const foodRouter = require('../routes/food.js');
const plannedMealRouter = require('../../routes/plannedMeal.js');
const notificationRouter = require("../../routes/notification.js");
const reportRouter = require('../routes/report.js');

router.use('/wearables', wearableRouter);
router.use('/users', userRouter);
router.use('/activity-data', activityDataRouter);
router.use('/meal-plans', mealPlanRouter);
router.use('/foods', foodRouter);
router.use('/planned-meals', plannedMealRouter);
router.use('/notifications', notificationRouter);
router.use('/reports', reportRouter);

module.exports = router