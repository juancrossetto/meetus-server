const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  surName: {
    type: String,
    required: false,
    trim: true,
  },
  dni: {
    type: Number,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  city: {
    type: String,
    required: false,
    trim: true,
  },
  country: {
    type: String,
    required: false,
    trim: true,
  },
  image: {
    type: String,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  points: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
