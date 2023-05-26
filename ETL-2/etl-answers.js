const {db} = require('./db2')
const fs = require('fs');
const readline = require('node:readline')
let dirty = [];

const event = fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/answers.csv')
const read = readline.createInterface({
  input: event,
  crlfDelay: Infinity,
});

read.on('error', (error) => {
  throw Error(error.message);
})

read.on('line', (line) => {
  const dataArray = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      if (dataArray[6] === '1') {
        dataArray[6] = true;
      } else {
        dataArray[6] = false;
      }
  if (dataArray.length === 8) {
    db.query(`INSERT INTO "answers"
      ("answer_id",
      "question_id",
      "body",
      "date",
      "answerer_name",
      "answerer_email",
      "reported",
      "helpfulness")
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, dataArray)
      .then(result => {
        console.log('Written to answers')
      })
      .catch(err => {
        console.log(err, dataArray)
        event.destroy()
      })
  } else {
    console.log('DATA ISSUES! STOP FUNCTION', dataArray)
    event.destroy();
  }
})

read.on('finish', (finish) => {
   console.log('done', finish)
});