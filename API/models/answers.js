const db = require('../db2')

module.exports.getAnswers = (req) => {
  return db.query(
    `quanswers=# SELECT
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
      AND answers.question_id = ${req.params.questionid}
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

module.exports.postAnswers = (req) => {
  return db.query(
    `INSERT INTO answers
    values($1,$2,$3,$4,$5,$6,$7,$8)`,
    req.data)
}

module.exports.putAnswers = (req) => {
  if (url.parse(req.url).path === 'helpful') {
    return db.query(
      `UPDATE answers
      SET helpfulness = helpfulness + 1
      WHERE answer_id = ${req.params.answer_id}`
    )
  } else if ((url.parse(req.url).path === 'report')) {
    return db.query(
      `UPDATE answers
      SET reported = true
      WHERE answer_id = ${req.params.answer_id}`
      )
  }
}

