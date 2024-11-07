const express = require('express');
const router = express.Router();
const PlannedMeal = require('../models/PlannedMeal');

// GET /planned-meals - получить список всех запланированных приемов пищи
router.get('/', async (req, res) => {
  try {
    const plannedMeals = await PlannedMeal.findAll();
    res.json(plannedMeals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /planned-meals/:id - получить конкретный запланированный прием пищи по ID
router.get('/:id', async (req, res) => {
  try {
    const plannedMeal = await PlannedMeal.findByPk(req.params.id);
    if (!plannedMeal) return res.status(404).json({ message: "Planned meal not found" });
    res.json(plannedMeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /planned-meals - создать новый запланированный прием пищи
router.post('/', async (req, res) => {
  try {
    const plannedMeal = await PlannedMeal.create(req.body);
    res.status(201).json(plannedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /planned-meals/:id - обновить запланированный прием пищи
router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, [updatedPlannedMeal]] = await PlannedMeal.update(req.body, {
      where: { planned_meal_id: req.params.id },
      returning: true
    });
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Planned meal not found" });
    res.json(updatedPlannedMeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /planned-meals/:id - удалить запланированный прием пищи
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await PlannedMeal.destroy({ where: { planned_meal_id: req.params.id }});
    if (rowsDeleted === 0) return res.status(404).json({ message: "Planned meal not found" });
    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;