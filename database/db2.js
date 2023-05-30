require('dotenv').config();
const { Pool } = require('pg');
// const Pool = require('pg-pool')

const db = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
});

db.connect()

module.exports = {db}