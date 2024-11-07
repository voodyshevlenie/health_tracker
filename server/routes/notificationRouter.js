const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /notifications - получить список всех уведомлений
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /notifications/:id - получить конкретное уведомление по ID
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /notifications - отправить новое уведомление
router.post('/', async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /notifications/:id - изменить статус прочтения уведомления
router.put('/:id/markAsRead', async (req, res) => {
  try {
    await Notification.update({ read_status: true }, {
      where: { notification_id: req.params.id }
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /notifications/:id - удалить уведомление
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Notification.destroy({ where: { notification_id: req.params.id }});
    if (rowsDeleted === 0) return res.status(404).json({ message: "Notification not found" });
    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;