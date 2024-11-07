const { Wearable } = require('../models/Wearable'); 

exports.getWearables = async (req, res) => {
  try {
    const wearables = await Wearable.findAll(); // Получаем все записи из таблицы 'wearables'
    res.json(wearables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getWearableById = async (req, res) => {
  try {
    const wearable = await Wearable.findByPk(req.params.id); // Находим запись по id
    if (!wearable) return res.status(404).json({ message: "Wearable not found" });
    res.json(wearable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createWearable = async (req, res) => {
  try {
    const wearable = await Wearable.create(req.body); // Создаем новую запись
    res.status(201).json(wearable);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateWearable = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedWearable]] = await Wearable.update(
      req.body,
      { where: { wearable_id: req.params.id }, returning: true }
    );
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Wearable not found" });
    res.json(updatedWearable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteWearable = async (req, res) => {
  try {
    const deletedRowsCount = await Wearable.destroy({
      where: { wearable_id: req.params.id }
    });
    if (deletedRowsCount === 0) return res.status(404).json({ message: "Wearable not found" });
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};