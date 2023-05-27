const db = require('./models');

module.exports.get = (req, res) => {

    models.getQuestions(req)
      .then(results => {
        res.status(200).send(JSON.stringify(results))
      })
      .catch(error => {
        res.send(404)
      })

}
module.exports.post = (req, res) =>  {

    models.postQuestions(req)
      .then(results => {
        res.status(201).send(JSON.stringify(results))
      })
      .catch(error => {
        res.send(404)
      })



}

module.exports.put = (req, res) => {
    models.putQuestions(req)
      .then(results => {
        res.status(201).send(JSON.stringify(results))
      })
      .catch(error => {
        res.send(404)
      })


}
