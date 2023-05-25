const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/qanda')

const questionsSchema = new mongoose.Schema({
  _id: {
      type: Number,
      primaryKey: true,
    },
    product_id: Number,
    question_body: String,
    question_date: String,
    asker_name: String,
    asker_email: String,
    question_helpfulness: Number,
    reported: Boolean,
});

const Questions = mongoose.model('Question', questionsSchema)

const answersSchema = newMogoose.Schema({
  _id: {
    type: Number,
    primaryKey: true,
  }
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  reported: Boolean,
  question_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Question'
  }
  Photos: {
    type: Array,
  }
});

const Answers = mongoose.model('Answer', answersSchema)