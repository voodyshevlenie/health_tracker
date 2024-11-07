const { User } = require('../models/User'); 

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Получаем все записи из таблицы 'users'
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Находим запись по id
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body); // Создаем новую запись
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedUser]] = await User.update(
      req.body,
      { where: { user_id: req.params.id }, returning: true, plain: true }
    );
    if (!updatedRowsCount) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedRowsCount = await User.destroy({
      where: { user_id: req.params.id }
    });
    if (!deletedRowsCount) return res.status(404).json({ message: "User not found" });
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};