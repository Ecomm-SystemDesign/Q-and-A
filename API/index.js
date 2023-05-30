const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { db } = require('./db2')
const { router } = require('./router');
const logger = require('./middleware/logger');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))

//app.use(logger)

app.use('/api/qa', router)

if (!module.parent) {
  app.listen(process.env.SERVERPORT, () => {
    console.log(`LISTENING ON PORT http://localhost:${process.env.SERVERPORT}/`);
  })
}

module.exports = app;