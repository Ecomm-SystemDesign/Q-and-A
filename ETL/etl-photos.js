const {db} = require('./db2')
const fs = require('fs');
const readline = require('node:readline')

let count = 2; // 0 1

const readAndStore = (i) => {
  const event = fs.createReadStream(`/Users/dillonarmstrong/Hack/Quanswers/ETL/answers_photos-${i}.csv`)
  const read = readline.createInterface({
    input: event,
    crlfDelay: Infinity,
  });

  read.on('error', (error) => {
    throw Error(error.message);
  })

  read.on('line' , (line) => {
    let data = line.toString().split('\n')

    const breakItDown = (data) => {
      data.map(line => {
        const data = line.split(',')
        if (data.length === 3) {
          db.query(`INSERT INTO photos
          ("photo_id",
          "answer_id",
          "photo_url")
          values ($1,$2,$3)`, data)
          .then(result => {
            console.log('Written to photos')
          })
          .catch(err => {
            console.log(err, data)
            //event.destroy()
          })
        } else {
          console.log('DATA ISSUES! STOP FUNCTIONS!', data)
          event.destroy()
        }
      });
    }
    breakItDown(data)
  })
  read.on('finish', (finish) => {
    console.log('done with' + count, finish)
    readAndStore(count)
  });
}

readAndStore(count)
