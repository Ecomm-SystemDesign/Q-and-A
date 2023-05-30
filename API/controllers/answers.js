const models = require('../models');

module.exports.get = (req, res) => {

  models.answers.get(req)
    .then(results => {
      // results.rows.forEach(row => {
      //   if (row.photos) {
      //     row.photos = row.photos.split('\\n')
      //   }
      // })
      res.status(200).send(JSON.stringify(results.rows))
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(503)
    })

};

module.exports.post = (req, res) => {

  models.answers.post(req)
  .then(results => {
    res.status(201).send('TABLE UPDATED')
  })
  .catch(error => {
    res.sendStatus(503)
  })

}

module.exports.put = {

  helpful: (req, res) => {

    models.answers.helpful(req)
    .then(results => {
      res.status(201).send('COLUMN UPDATED')
    })
    .catch(error => {
      res.sendStatus(503)
    })
  },
  reported: (req, res) => {

    models.answer.report(req)
    .then(results => {
      res.status(201).send('COLUMN UPDATED')
    })
    .catch(error => {
      res.sendStatus(503)
    })
  }

};