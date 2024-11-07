const { ActivityData } = require('../models/ActivityData'); 
exports.getActivityData = async (req, res) => {
  try {
    const activityData = await ActivityData.findAll(); // Получаем все записи из таблицы 'activity_data'
    res.json(activityData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getActivityDataById = async (req, res) => {
  try {
    const activityData = await ActivityData.findByPk(req.params.id); // Находим запись по id
    if (!activityData) return res.status(404).json({ message: "Activity data not found" });
    res.json(activityData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createActivityData = async (req, res) => {
  try {
    const activityData = await ActivityData.create(req.body); // Создаем новую запись
    res.status(201).json(activityData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateActivityData = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedActivityData]] = await ActivityData.update(
      req.body,
      { where: { activity_data_id: req.params.id }, returning: true }
    );
    if (updatedRowsCount === 0) return res.status(404).json({ message: "Activity data not found" });
    res.json(updatedActivityData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteActivityData = async (req, res) => {
  try {
    const deletedRowsCount = await ActivityData.destroy({
      where: { activity_data_id: req.params.id }
    });
    if (deletedRowsCount === 0) return res.status(404).json({ message: "Activity data not found" });
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};