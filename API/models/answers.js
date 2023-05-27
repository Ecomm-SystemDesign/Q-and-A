const {db} = require('../db2');

module.exports.get = (req) => {
  console.log(req.query);
  return db.query(
    `SELECT
      answers.answer_id,
      answers.question_id,
      answers.body,
      answers.date,
      answers.answerer_name,
      answers.answerer_email,
      answers.reported,
      answers.helpfulness,
      array_agg(photos.photo_url) AS photos
    FROM answers
    LEFT JOIN photos ON answers.answer_id = photos.answer_id
    WHERE answers.reported = false
      AND answers.question_id = ${req.params.question_id}
    GROUP BY
      answers.answer_id,
      answers.question_id,
      answers.body,
      answers.date,
      answers.answerer_name,
      answers.answerer_email,
      answers.reported,
      answers.helpfulness`
  )

}

module.exports.post = (req) => {
  return db.query(
    `INSERT INTO answers
      body,
      answerer_name,
      answerer_email,
      date,
      question_id,
      answer_helpfulness,
      answer_reported
    VALUES(
      ${req.body.body},
      ${req.body.name},
      ${req.body.email},
      ${req.params.question_id},
      ${Date.now()},
      0,
      false
    )`
  )
}

module.exports.helpful = (req) => {
  return db.query(
    `UPDATE answers
    SET helpfulness = helpfulness + 1
    WHERE answer_id = ${req.params.answer_id}`
  )

}

module.exports.report = () => {
  return db.query(
    `UPDATE answers
    SET reported = true
    WHERE answer_id = ${req.params.answer_id}`
    )
}

