const {db} = require('../db');
const fs = require('fs');
const readline = require('node:readline');

const answerEvent = fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/test.csv')
const readAnswer = readline.createInterface({
  input: answerEvent,
  crlfDelay: Infinity,
});

readAnswer.on('error', (error) => {
  throw Error(error.message);
})

readAnswer.on('line', (line) => {
  const dataArray = JSON.parse(JSON.stringify(line)).split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
  if (dataArray[6] === '1') {
    dataArray[6] = true;
  } else {
    dataArray[6] = false;
  }
  db.query(`SELECT * FROM "questions" where question_id=${dataArray[1]}`)
    .then(results => {
      console.log(results.rows)
      if (results.rows.length) { //if key is in table write normally
        if (dataArray[6] === true) {
          db.query(`INSERT INTO "reported_answers"
            ("answer_id",
            "question_id",
            "body",
            "date",
            "answerer_name",
            "answerer_email",
            "reported",
            "helpfulness")
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING
            ("answer_id",
            "question_id",
            "body",
            "date",
            "answerer_name",
            "answerer_email",
            "reported",
            "helpfulness")`, dataArray)
            .then(result => {
              //console.log('Written to reported')
            })
            .catch(err => {
              console.log('report_answers w/ FK', dataArray)
              throw Error(err)
              answerEvent.destroy(err)
            })
          } else if (dataArray.length === 8) {
            db.query(`INSERT INTO "answers"
              ("answer_id",
              "question_id",
              "body",
              "date",
              "answerer_name",
              "answerer_email",
              "reported",
              "helpfulness")
              VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
              RETURNING
              ("answer_id",
              "question_id",
              "body",
              "date",
              "answerer_name",
              "answerer_email",
              "reported",
              "helpfulness")`, dataArray)
              .then(result => {
                //console.log('Written to reported')
              })
              .catch(err => {
                console.log('answers w/ FK', dataArray)
                throw Error(err)
                answerEvent.destroy(err)
              })
          } else {
            console.log(dataArray)
            throw Error('DATA ISSUES! STOP FUNCTIONS!', dataArray)
            answerEvent.destroy(err)
          }
      } else { // else insert with question_reported_id foreign key
        // dataArray.splice(1, 1)
        if (dataArray[6] === true) {
          db.query(`INSERT INTO "reported_answers"
              ("answer_id",
              "question_reported_id",
              "body",
              "date",
              "answerer_name",
              "answerer_email",
              "reported",
              "helpfulness")
              VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
              RETURNING
              ("answer_id",
              "question_reported_id",
              "body",
              "date",
              "answerer_name",
              "answerer_email",
              "reported",
              "helpfulness")`, dataArray)
              .then(result => {
                //console.log('Written to reported')
              })
              .catch(err => {
                console.log('reported answers', dataArray)
                throw Error(err)
                answerEvent.destroy(err)
              })
          } else if (dataArray.length === 8) {
            db.query(`INSERT INTO "answers"
              ("answer_id",
              "question_reported_id",
              "body",
              "date",
              "answerer_name",
              "answerer_email",
              "reported",
              "helpfulness")
              VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
              RETURNING
              ("answer_id",
              "question_reported_id",
              "body",
              "date",
              "answerer_name",
              "answerer_email",
              "reported",
              "helpfulness")`, dataArray)
              .then(result => {
                //console.log('Written to reported')
              })
              .catch(err => {
                console.log('answers', dataArray)
                throw Error(err)
                answerEvent.destroy(err)
              })
          } else {
            console.log(dataArray)
            throw Error('DATA ISSUES! STOP FUNCTIONS!', dataArray)
            answerEvent.destroy(err)
          }
      }
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