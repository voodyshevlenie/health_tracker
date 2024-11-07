const { PlannedMeal } = require('../models/PlannedMeal'); 

exports.getPlannedMeals = async (req, res) => {
  try {
    const plannedMeals = await PlannedMeal.findAll(); // Получение всех записей из таблицы 'planned_meals'
    res.json(plannedMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getPlannedMealById = async (req, res) => {
  try {
    const plannedMeal = await PlannedMeal.findByPk(req.params.id); // Поиск записи по id
    if (!plannedMeal) return res.status(404).json({ message: "Planned meal not found" });
    res.json(plannedMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createPlannedMeal = async (req, res) => {
  try {
    const plannedMeal = await PlannedMeal.create(req.body); // Создание новой записи
    res.status(201).json(plannedMeal);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updatePlannedMeal = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedPlannedMeal]] = await PlannedMeal.update(
      req.body,
      { where: { planned_meal_id: req.params.id }, returning: true }
    );
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Planned meal not found" });
    res.json(updatedPlannedMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deletePlannedMeal = async (req, res) => {
  try {
    const deletedRowsCount = await PlannedMeal.destroy({
      where: { planned_meal_id: req.params.id }
    });
    if (deletedRowsCount === 0) return res.status(404).json({ message: "Planned meal not found" });
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};