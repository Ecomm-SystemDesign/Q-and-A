const db = require('../db2');
const url = require('url')

module.exports.getQuestions = (req) => {
  return db.query(
    `SELECT * FROM questions
    WHERE reported=false
    AND product_id=${req.query.product_id}
    LIMIT 100`
  )
}

module.exports.postQuestions = (req) => {
  return db.query(
    `INSERT INTO questions
    values($1,$2,$3,$4,$5,$6,$7,$8)`,
    req.data)
}

module.exports.putQuestions = (req) => {
  if (url.parse(req.url).path === 'helpful') {
    return db.query(
      `UPDATE questions
      SET helpfulness = helpfulness + 1
      WHERE question_id = ${req.params.question_id}`
    )
  } else if ((url.parse(req.url).path === 'report')) {
    return db.query(
      `UPDATE questions
      SET reported = true
      WHERE question_id = ${req.param.question_id}`
      )
  }
}