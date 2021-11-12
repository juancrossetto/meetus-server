const Trade = require('../models/Trade');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.getPoints = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { id } = req.body;

    // Si el Usuario existe o no
    let trade = await Trade.findOne({ _id: req.params.id });

    if (!trade) {
      return res.status(500).json({ msg: 'No existe el Usuario indicado' });
    }
 
    
    res.json({ points: trade });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

