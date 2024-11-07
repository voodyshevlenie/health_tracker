const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /users - получить список всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:id - получить конкретного пользователя по ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users - создать нового пользователя
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id - обновить информацию о пользователе
router.put('/:id', async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: { user_id: req.params.id },
      returning: true,
      plain: true
    });
    if (!user[0]) return res.status(404).json({ message: "User not found" });
    res.json(user[1]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /users/:id - удалить пользователя
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await User.destroy({ where: { user_id: req.params.id } });
    if (!rowsDeleted) return res.status(404).json({ message: "User not found" });
    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;