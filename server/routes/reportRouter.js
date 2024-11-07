const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET /reports - получить список всех отчетов
router.get('/', async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /reports/:id - получить конкретный отчет по ID
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /reports - создать новый отчет
router.post('/', async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /reports/:id - обновить отчет
router.put('/:id', async (req, res) => {
    try {
      const [updatedRowsCount, [updatedReport]] = await Report.update(req.body, {
        where: { report_id: req.body.report_id },
        returning: true
      });
      if (updatedRowsCount === 0) return res.status(404).json({ message: "Report not found" });
      res.json(updatedReport);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // DELETE /reports/:id - удалить отчет
  router.delete('/:id', async (req, res) => {
    try {
      const rowsDeleted = await Report.destroy({ where: { report_id: req.params.id }});
      if (rowsDeleted === 0) return res.status(404).json({ message: "Report not found" });
      res.sendStatus(204); // No Content
    } catch (err) {
      res.status(500).json({ message: err.mainMessage });
    }
  });
  
  module.exports = router;