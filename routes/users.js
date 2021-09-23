const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const consumoController = require('../controllers/consumoController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Create an user
// api/user
router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('surName', 'El Apellido es obligatorio.').not().isEmpty(),
    check('dni', 'El DNI es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

router.get('/:userType', userController.getUsers);

router.get('/mail/:email', userController.getUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/checkPassword', userController.checkPassword);

module.exports = router;
