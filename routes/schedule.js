const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Create a schedule
// api/schedule
router.post('/', scheduleController.updateSchedule);

router.get('/', scheduleController.getSchedule);

module.exports = router;
