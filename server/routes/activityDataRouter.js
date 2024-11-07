const express = require('express');
const router = express.Router();
const ActivityData = require('../models/ActivityData');

// GET /activity-data - получить список всех данных о физической активности
router.get('/', async (req, res) => {
  try {
    const activityData = await ActivityData.findAll();
    res.json(activityData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /activity-data/:id - получить конкретные данные о физической активности по ID
router.get('/:id', async (req, res) => {
  try {
    const activityData = await ActivityData.findByPk(req.params.id);
    if (!activityData) return res.status(404).json({ message: "Activity data not found" });
    res.json(activityData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /activity-data - создать новые данные о физической активности
router.post('/', async (req, res) => {
  try {
    const activityData = await ActivityData.create(req.body);
    res.status(201).json(activityData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /activity-data/:id - обновить данные о физической активности
router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, [updatedActivityData]] = await ActivityData.update(req.body, {
      where: { activity_data_id: req.params.id },
      returning: true
    });
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Activity data not found" });
    res.json(updatedActivityData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /activity-data/:id - удалить данные о физической активности
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await ActivityData.destroy({ where: { activity_data_id: req.params.id } });
    if (rowsDeleted === 0) return res.status(404).json({ message: "Activity data not found" });
    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;