const {db} = require('./db2')
const fs = require('fs');
const readline = require('node:readline')
let dirty = [];

const event = fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/answer_photos.csv')
const read = readline.createInterface({
  input: event,
  crlfDelay: Infinity,
});

read.on('error', (error) => {
  throw Error(error.message);
})

read.on('line' , (line) => {
  const data = line.split(',')
  if (data.length === 3) {
    db.query(`INSERT INTO photos
    ("photo_id",
    "answer_id",
    "photo_url")
    values ($1,$2,$3)`, data)
    .then(result => {
      console.log('Written to answers')
    })
    .catch(err => {
      console.log(err, data)
      event.destroy()
    })
  } else {
    console.log('DATA ISSUES! STOP FUNCTIONS!', data)
    event.destroy()
  }
})

read.on('finish', (finish) => {
  console.log('done', finish)
});