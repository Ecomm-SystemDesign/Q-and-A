const fs = require('node:fs')
const { db } = require('../db2')
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
    reported) FROM STDIN with DELIMITER ','`
  ))

  const fileStream = fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/questions.csv')

  stream.on('error', (err) => {
    console.log(err)
  })

  fileStream.pipe(stream)

  stream.on('finish', () => {
    const stream1 = client.query(from(
      `COPY answers (
      answer_id,
      question_id,
      body,
      date,
      answerer_name,
      answerer_email,
      helpfulness,
      reported) FROM STDIN with DELIMITER ','`
    ))

    const fileStream = fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/answers.csv')

    stream1.on('error', (err) => {
      console.log(err)
    })

    fileStream.pipe(stream1)

    stream1.on('finish', () => {
      const stream2 = client.query(from(`COPY photo_test (photo_id, answer_id, photo_url) FROM STDIN with DELIMITER ','`))

      const fileStream = fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/answers_photos.csv')

      stream2.on('error', (err) => {
        console.log(err)
      })

      fileStream.pipe(stream2)

      stream2.on('finish', done)
    })
  })
})