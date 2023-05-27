const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.get('/questions/:question_id/answers', controllers.answers.get)
router.get('/questions', controllers.questions.get)

router.post('/questions', controllers.questions.post)
router.post('/questions/:question_id/answers', controllers.answers.post)

router.put('/questions/:question_id/helpful', controllers.questions.put.helpful)
router.put('/questions/:question_id/answers/helpful', controllers.answers.put.helpful)
router.put('/questions/:question_id/reported', controllers.questions.put.reported)
router.put('/questions/:question_id/answers/reported', controllers.answers.put.reported)

module.exports = {router}

