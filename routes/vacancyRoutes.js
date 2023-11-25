const express = require('express');
const vacancyController = require('../controllers/vacancyController');

const router = express.Router();

router
  .route('/')
  .get(vacancyController.getAllVacancies)
  .post(vacancyController.createVacancy);
router
  .route('/:id')
  .get(vacancyController.getVacancy)
  .patch(vacancyController.updateVacancy)
  .delete(vacancyController.deleteVacancy);

module.exports = router;
