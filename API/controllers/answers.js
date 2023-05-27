const models = require('../models');

module.exports.get = (req, res) => {
  console.log(req.params)
  models.answers.get(req)
    .then(results => {
      console.log(results)
      res.status(200).send(JSON.stringify(JSON.parse(results.rows)))
    })
    .catch(error => {
      res.sendStatus(503)
    })

};

module.exports.post = (req, res) => {

  models.answers.post(req)
  .then(results => {
    res.status(201).send(JSON.stringify(results))
  })
  .catch(error => {
    res.sendStatus(503)
  })

}

module.exports.put = {

  helpful: (req, res) => {
    console.log(req.params, 'made it')
    models.answers.helpful(req)
    .then(results => {
      res.status(201).send(JSON.stringify(results))
    })
    .catch(error => {
      res.sendStatus(503)
    })
  },
  reported: (req, res) => {
    console.log(req.params, 'made it')
    models.answer.report(req)
    .then(results => {
      res.status(201).send(JSON.stringify(results))
    })
    .catch(error => {
      res.sendStatus(503)
    })
  }

};