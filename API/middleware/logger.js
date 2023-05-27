module.exports = (req, res, next) => {
  console.log('request to URL: ', req.url);
  console.log(' METHOD: ', req.method);
  console.log('With QUERY: ', req.query);
  console.log('and PARAMS: ', req.params);
  console.log('and BODY: ', req.body);
  next();
};