const express = require('express');
const router = express.Router();
const dailyQuestionController = require('../controllers/dailyQuestionController');

// Create a Daily Question
// api/trade
router.post(
  '/',  dailyQuestionController.createDailyQuestion
);

router.get('/', dailyQuestionController.getAll);

router.delete('/:id', dailyQuestionController.deleteDailyQuestion);


module.exports = router;
