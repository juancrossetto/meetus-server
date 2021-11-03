const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema({
  email: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  points: {
    type: Number,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('Trade', TradeSchema);
