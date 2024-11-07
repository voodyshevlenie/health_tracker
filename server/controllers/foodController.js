const { Food } = require('../models/Food');

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.findAll(); // Получаем все записи из таблицы 'foods'
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id); // Находим запись по id
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body); // Создаем новую запись
    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedFood]] = await Food.update(
      req.body,
      { where: { food_id: req.params.id }, returning: true }
    );
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Food not found" });
    res.json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const deletedRowsCount = await Food.destroy({
      where: { food_id: req.params.id }
    });
    if (deletedRowsCount === 0) return res.status(404).json({ message: "Food not found" });
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};