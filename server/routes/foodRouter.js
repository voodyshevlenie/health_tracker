const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// GET /foods - получить список всех продуктов
router.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /foods/:id - получить конкретный продукт по ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /foods - создать новый продукт
router.post('/', async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /foods/:id - обновить информацию о продукте
router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, [updatedFood]] = await Food.update(req.body, {
      where: { food_id: req.params.id },
      returning: true
    });
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Food not found" });
    res.json(updatedFood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /foods/:id - удалить продукт
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Food.destroy({ where: { food_id: req.params.id } });
    if (rowsDeleted === 0) return res.status(404).json({ message: "Food not found" });
    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;