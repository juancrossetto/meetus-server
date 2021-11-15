const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  hourFrom: {
    type: String,
    trim: true,
  },
  hourTo: {
    type: String,
    trim: true,
  },
  minuteFrom: {
    type: String,
    require: true,
  },
  minuteTo: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
