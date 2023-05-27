const express = require('express');
const cors = require('cors');
// const path = require('path')
const { router } = require('./router');
require('dotenv')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/qa', router)

app.connect()

app.listen(process.env.SERVER-PORT, () => {
  console.log(`LISTENING ON PORT http://localhost:${port}/`);
})