const {db} = require('../db2');

module.exports.get = (req) => {
  return db.query(
    `SELECT * FROM questions
    WHERE reported=false
    AND product_id=${req.query.product_id}
    LIMIT ${req.query.count}`
  )
}

module.exports.post = (req) => {
  return db.query(
    `INSERT INTO questions
      body,
      asker_name,
      asker_email,
      product_id,
      question_date,
      question_helpfulness,
      question_reported
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
}

module.exports.helpful = (req) => {
  return db.query(
    `UPDATE questions
    SET helpfulness = helpfulness + 1
    WHERE question_id = ${req.params.question_id}`
  )
}

module.exports.report = (req) => {
  return db.query(
    `UPDATE questions
    SET reported = true
    WHERE question_id = ${req.param.question_id}`
    )
}