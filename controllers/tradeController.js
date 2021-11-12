const Trade = require('../models/Trade');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.getAllByUser = async (req, res) => {
  try {
    // Si el Usuario existe o no
    let trades = await Trade.find({ userId: req.params.id });

    if (!trades) {
      return res.status(500).json({ msg: 'No existe el Usuario indicado' });
    }

    res.json({ trades });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.createTrade = async (req, res) => {
  try {
    let trade = new Trade(req.body);
    await trade.save();

    res.json({ trade: trade });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear el canje');
  }
};
