const {db} = require('../db')
const fs = require('fs');
const readline = require('node:readline')
let dirty = [];

const event = fs.createReadStream('./questions.csv')
const read = readline.createInterface({
  input: event,
  crlfDelay: Infinity,
});


read.on('line', (line) => {

  let data = line.toString().split('\n')

  const breakItDown = (data) => {
    data.map(line => {
      let items = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      if (items[6] === '1') {
        items[6] = true;
      } else {
        items[6] = false;
      }
      if (items[6] === true) {
        db.query(`INSERT INTO "reported_questions"
        ("question_id",
        "product_id",
        "question_body",
        "question_date",
        "asker_name",
        "asker_email",
        "reported",
        "question_helpfulness")
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING
        ("question_id",
        "product_id",
        "question_body",
        "question_date",
        "asker_name",
        "asker_email",
        "reported",
        "question_helpfulness")`, items)
        .then(result => {
          console.log('Written to reported')
        })
        .catch(err => {
          console.log(err)
        })
      } else if (items.length === 8) {
        db.query(`INSERT INTO "questions"
        ("question_id",
        "product_id",
        "question_body",
        "question_date",
        "asker_name",
        "asker_email",
        "reported",
        "question_helpfulness")
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING
        ("question_id",
        "product_id",
        "question_body",
        "question_date",
        "asker_name",
        "asker_email",
        "reported",
        "question_helpfulness")`, items)
        .then(result => {
          console.log('written to questions')
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        console.log('dirty.data', line)
        dirty.push(line);
        return;
      }
    });
  }
  breakItDown(data)
})
read.on('error', (error) => {
  throw Error(error.message);
})
read.on('finish', (finish) => {
  console.log('finished')
})

//--max-old-space-size=8192
