const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

// Create a Trade
// api/trade
router.post('/', tradeController.createTrade);

router.get('/:id', tradeController.getAllByUser);


module.exports = router;
