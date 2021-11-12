const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const EmailSchema = mongoose.Schema({
  from: {
    type: String,
    trim: true,
  },
  to: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    trim: true,
  },
  sendDate: {
    type: Date,
    default: Date.now(),
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
});

module.exports = mongoose.model("Email", EmailSchema);