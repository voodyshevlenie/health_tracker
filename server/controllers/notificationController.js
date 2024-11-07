const { Notification } = require('../models/Notification'); 

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll(); // Получаем все записи из таблицы 'notifications'
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id); // Находим запись по id
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body); // Создаем новую запись
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    await Notification.update({ read_status: true }, {
      where: { notification_id: req.params.id }
    }); // Обновляем статус уведомления
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const deletedRowsCount = await Notification.destroy({
      where: { notification_id: req.params.id }
    });
    if (deletedRowsCount === 0) return res.status(404).json({ message: "Notification not found" });
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};