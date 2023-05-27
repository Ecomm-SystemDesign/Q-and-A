const {db} = require('../db');
const fs = require('fs');
const readline = require('node:readline');

let count = 0;
const readAndStore = (i) => {
  console.log('reading')
const answerEvent = fs.createReadStream(`/Users/dillonarmstrong/Hack/Quanswers/ETL/answers-${i}.csv`)
const readAnswer = readline.createInterface({
  input: answerEvent,
  crlfDelay: Infinity,
});

readAnswer.on('error', (error) => {
  throw Error(error.message);
})

readAnswer.on('line', (line) => {
  let data = line.toString().split()
  const breakItDown = (data) => {
    data.map(line => {
      const dataArray = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      if (dataArray[6] === '1') {
        dataArray[6] = true;
      } else {
        dataArray[6] = false;
      }
      db.query(`SELECT * FROM "questions" where question_id=${dataArray[1]}`)
        .then(results => {
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
                  console.log('Written to reported')
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
                    console.log('Written to answers')
                  })
                  .catch(err => {
                    console.log('answers w/ FK', dataArray, err)
                    // throw Error(err)
                    answerEvent.destroy()
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
                    console.log('Written to answers')
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
  }

    breakItDown(data)
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
};

// while (count < 6) {
//   readAndStore(count)
//   count++
//   console.log('reading file' + count)
// }

//readAndStore(0)

//readAndStore(1)
//readAndStore(2)
// readAndStore(3)
//readAndStore(4)
//readAndStore(5)
readAndStore(6)