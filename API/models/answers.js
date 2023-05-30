const { db } = require('../../database/db2');

module.exports.get = (req) => {
  return db.query(
    `SELECT
      answers.answer_id,
      question_id,
      body,
      TO_TIMESTAMP(date),
      answerer_name,
      answerer_email,
      reported,
      helpfulness,
      jsonb_agg(photos.photo_url) AS photos
    FROM answers
    LEFT JOIN photos ON answers.answer_id = photos.answer_id
    WHERE answers.reported = false
      AND answers.question_id = ${req.params.question_id}
    GROUP BY answers.answer_id
    ORDER BY date DESC`
  )

  // before switching to string_agg
  // Planning Time: 0.339 ms
  // Execution Time: 0.229 ms

  // after:
  // Planning Time: 0.226 ms
  // Execution Time: 0.105 ms
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


