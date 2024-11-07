const { MealPlan } = require('../models/MealPlan');

exports.getMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.findAll(); // Получаем все записи из таблицы 'meal_plans'
    res.json(mealPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getMealPlanById = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByPk(req.params.id); // Находим запись по id
    if (!mealPlan) return res.status(404).json({ message: "Meal plan not found" });
    res.json(mealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.create(req.body); // Создаем новую запись
    res.status(201).json(mealPlan);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedMealPlan]] = await MealPlan.update(
      req.body,
      { where: { meal_plan_id: req.params.id }, returning: true }
    );
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Meal plan not found" });
    res.json(updatedMealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMealPlan = async (req, res) => {
  try {
    const deletedRowsCount = await MealPlan.destroy({
      where: { meal_plan_id: req.params.id }
    });
    if (deletedRowsCount === 0) return res.status(404).json({ message: "Meal plan not found" });
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};