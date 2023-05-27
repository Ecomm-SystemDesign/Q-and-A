const express = require('express');
const cors = require('cors');
const app = express();
const router = require('router');
const path = require('path')
require('dotenv')

app.use(express.json());
app.use(cors());

app.use('/api/qa', router)

app.connect()

app.listen(process.env.SERVER-PORT, () => {
  console.log(`LISTENING ON PORT http://localhost:${port}/`);
})