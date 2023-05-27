const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.get('/questions', controllers.questions.get)
router.get('/answers', controllers.answers.get)

router.post('/questions', controllers.questions.post)
router.post('/answers', controllers.answers.post)

router.put('/questions', controllers.questions.put)
router.put('/answers', controllers.answers.put)

module.exports = {router}

