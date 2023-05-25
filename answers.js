const {db} = require('../db');
const fs = require('fs');
const readline = require('node:readline');

const answerEvent = fs.createReadStream('./test.csv')
const readAnswer = readline.createInterface({
  input: answerEvent,
  crlfDelay: Infinity,
});

readAnswer.on('error', (error) => {
  throw Error(error.message);
})

readAnswer.on('line', (line) => {
  const dataArray = JSON.parse(JSON.stringify(line)).split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
  console.log(dataArray)
  db.query(`INSERT INTO "reported_answers"
        ("answer_id"
        "question_id"
        "body"
        "date"
        "answerer_name"
        "answerer_email"
        "reported"
        "helpfulness")
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING
        ("answer_id"
        "question_id"
        "body"
        "date"
        "answerer_name"
        "answerer_email"
        "reported"
        "helpfulness")`, items)
        .then(result => {
          console.log('Written to reported')
        })
        .catch(err => {
          console.log(err)
        })
})
readAnswer.on('finish', (finish) => {
  console.log('finished with answers, Starting photos')

  // const photoEvent = fs.createReadStream('./answers_photos.csv')
  // const readPhotos = readline.createInterface({
  //   input: photoEvent,
  //   crlfDelay: Infinity,
  // });
  // readPhotos.on('error', (error) => {
  //   throw Error(error.message);
  // });

  // readPhotos.on('line', (line) => {
  //   console.log(JSON.parse(JSON.stringify(line)))
  // });

  // readPhotos.on('finish', (finish) => {
  // });
});