const {db} = require('../db2');

module.exports.get = (req) => {
  return db.query(
    `SELECT
      question_id,
      product_id,
      question_body,
      date(to_timestamp(date)),
      asker_name,
      asker_email,
      reported,
      helpfulness
    FROM questions
    WHERE reported=false
    AND product_id=${req.query.product_id}
    GROUP BY question_id
    ORDER BY date DESC
    LIMIT ${req.query.count}`
  )
  // Planning Time: 0.175 ms
  // Execution Time: 0.130 ms
}

module.exports.post = (req) => {
  return db.query(
    `INSERT INTO questions
      (question_body,
      asker_name,
      asker_email,
      product_id,
      date,
      helpfulness,
      reported)
    VALUES(
      ${req.body.body},
      ${req.body.name},
      ${req.body.email},
      ${req.body.product_id},
      ${Date.now()},
      0,
      false
    )`
  )
  // Planning Time: 0.049 ms
 // Execution Time: 0.097 ms
}

module.exports.helpful = (req) => {
  return db.query(
    `UPDATE questions
    SET helpfulness = helpfulness + 1
    WHERE question_id = ${req.params.question_id}`
  )
  // Planning Time: 0.092 ms
  // Execution Time: 0.118 ms
}

module.exports.report = (req) => {
  return db.query(
    `UPDATE questions
    SET reported = true
    WHERE question_id = ${req.param.question_id}`
    )
}


