const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
  id: {
    type: Number,
    required: false,
    trim: true,
  },
  answer: {
    type: String,
    required: false,
    trim: true,
  },
  isCorrect: {
    type: Boolean,
    required: false,
  },
});

const DailyQuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: false,
    trim: true,
  },
  answers: {
    type: [AnswerSchema],
    required: true,
  },
});


module.exports = mongoose.model('DailyQuestion', DailyQuestionSchema);
