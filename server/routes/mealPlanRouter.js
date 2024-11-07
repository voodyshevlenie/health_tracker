const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// GET /meal-plans - получить список всех планов питания
router.get('/', async (req, res) => {
  try {
    const mealPlans = await MealPlan.findAll();
    res.json(mealPlans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /meal-plans/:id - получить конкретный план питания по ID
router.get('/:id', async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByPk(req.params.id);
    if (!mealPlan) return res.status(404).json({ message: "Meal plan not found" });
    res.json(mealPlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /meal-plans - создать новый план питания
router.post('/', async (req, res) => {
  try {
    const mealPlan = await MealPlan.create(req.body);
    res.status(201).json(mealPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /meal-plans/:id - обновить план питания
router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, [updatedMealPlan]] = await MealPlan.update(req.body, {
      where: { meal_plan_id: req.params.id },
      returning: true
    });
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Meal plan not found" });
    res.json(updatedMealPlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /meal-plans/:id - удалить план питания
router.delete('/:id', async (req, res) => {
    try {
      const rowsDeleted = await MealPlan.destroy({ where: { meal_plan_id: req.params.id } });
      if (rowsDeleted === 0) return res.status(404).json({ message: "Meal plan not found" });
      res.sendStatus(204); // No Content
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;