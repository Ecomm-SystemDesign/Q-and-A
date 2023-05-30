const fs = require('node:fs')
const { db } = require('../API/db2')
const { from } = require('pg-copy-streams')

db.connect(function (err, client, done) {
  const stream = client.query(from(
    `COPY questions (
    question_id,
    product_id,
    question_body,
    question_date,
    answerer_name,
    answerer_email,
    helpfulness,
    reported) FROM STDIN with DELIMITER ','`))
  const fileStream = fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/questions.csv')
  stream.on('finish', done)
  stream.on('error', (err) => {
    console.log(err)
  })
  fileStream.pipe(stream)
})