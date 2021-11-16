const mongoose = require('mongoose');

const ProductImageSchema = mongoose.Schema({
  url: {
    type: String,
  },
});

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  images: {
    type: [ProductImageSchema],
    required: false,
    trim: true,
  },
  madeIn: {
    type: String,
    required: false,
    trim: true,
  },
  stock: {
    type: Number,
    required: false,
  },
  points: {
    type: Number,
    required: false,
  },
  offerPoints: {
    type: Number,
    required: false,
  },
});

const TradeSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  userId: {
    type: String,
    required: false,
    trim: true,
  },
  product: {
    type: ProductSchema,
    required: false,
    trim: true,
  },
  points: {
    type: Number,
    required: false,
    trim: true,
  },
  fechaAlta: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Trade', TradeSchema);
