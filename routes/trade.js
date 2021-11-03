const express = require('express');
const router = express.Router();
const userController = require('../controllers/tradeController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Create an user
// api/user
router.post(
  '/',
  [check('email', 'El email es obligatorio.').not().isEmpty(), check('points', 'Los puntos son obligatorio.').not().isEmpty()],
  userController.createMovement
);

router.get('/:userType', userController.getUsers);

router.get('/mail/:email', userController.getUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/checkPassword', userController.checkPassword);

module.exports = router;
