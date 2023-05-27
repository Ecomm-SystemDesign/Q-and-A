const models = require('../models');

module.exports.get = (req, res) => {

  models.questions.get(req)
    .then(results => {
      res.status(200).send(JSON.stringify(results.rows))
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(503)
    })
}

module.exports.post = (req, res) =>  {

  models.questions.post(req)
    .then(results => {
      res.status(201).send(JSON.stringify(results))
    })
    .catch(error => {
      res.sendStatus(503)
    })
}

module.exports.put = {

  helpful: (req, res) => {
    models.questions.helpful(req)
      .then(results => {
        res.status(201).send('COLUMN UPDATED')
      })
      .catch(error => {
        res.sendStatus(503)
      })
  },
  reported: (req, res) => {
    models.questions.report(req)
      .then(results => {
        res.status(201).send('COLUMN UPDATED')
      })
      .catch(error => {
        res.sendStatus(503)
      })
    }

}
