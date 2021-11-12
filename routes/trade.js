const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Create a Trade
// api/trade
router.post(
  '/',
  [check('email', 'El email es obligatorio.').not().isEmpty(), check('points', 'Los puntos son obligatorio.').not().isEmpty()],
  userController.createMovement
);

router.get('/:id', userController.getAllByUser);

router.post('/', userController.createTrade);

module.exports = router;
