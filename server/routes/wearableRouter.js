const express = require('express');
const router = express.Router();
const Wearable = require('../models/Wearable');

// GET /wearables - получить список всех фитнес-браслетов
router.get('/', async (req, res) => {
  try {
    const wearables = await Wearable.findAll();
    res.json(wearables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /wearables/:id - получить конкретный фитнес-браслет по ID
router.get('/:id', async (req, res) => {
  try {
    const wearable = await Wearable.findByPk(req.params.id);
    if (!wearable) return res.status(404).json({ message: "Wearable not found" });
    res.json(wearable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /wearables - создать новый фитнес-браслет
router.post('/', async (req, res) => {
  try {
    const wearable = await Wearable.create(req.body);
    res.status(201).json(wearable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /wearables/:id - обновить информацию о фитнес-браслете
router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, [updatedWearable]] = await Wearable.update(req.body, {
      where: { wearable_id: req.params.id },
      returning: true
    });
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Wearable not found" });
    res.json(updatedWearable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /wearables/:id - удалить фитнес-браслет
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Wearable.destroy({ where: { wearable_id: req.params.id } });
    if (rowsDeleted === 0) return res.status(404).json({ message: "Wearable not found" });
    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;