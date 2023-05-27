const fs = require('node:fs')
const db = require('./db2')
const { from } = require('pg-copy-streams')

db.connect(function (err, client, done) {
  const stream = client.query(from('COPY photos (photo_id, answer_id, photo_url) FROM answer_photos.csv STDIN'))
  const fileStream = fs.createReadStream('/Users/dillonarmstrong/Hack/Quanswers/ETL/answers_photos.csv')
  stream.on('finish', done)
  fileStream.pipe(stream)
})