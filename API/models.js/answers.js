const db = require('./db2')

module.exports.getAnswers = (req) => {
  let aanswers = db.query(
    `SELECT
    answers.answer_id,
    answers.question_id,
    answers.body,
    answers.date,
    answers.answerer_name,
    answers.answerer_email,
    answers.reported,
    answers.helpfulness,
    array_agg(photos.photo_url)
    AS photos
    FROM answers
    JOIN photos ON answers.answer_id=photos.answer_id
    WHERE reported=false
    AND question_id=${req.query.question_id}
    LIMIT 100`
  )

}

module.exports.postAnswers = (req) => {
  return db.query(
    `INSERT INTO answers
    values($1,$2,$3,$4,$5,$6,$7,$8)`,
    req.data)
}

module.exports.putAnswers = (req) => {
  if (req.params.reported) {
    return db.query(
      `UPDATE answers
      SET reported=true
      WHERE answer_id=${}`
    )
  }
}

