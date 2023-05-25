require('dotenv').config();
const { Pool, Client } = require('pg');

const db = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB,
});
const testConnection = async () => {
  try {
    await db.query('SELECT 1');
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}
testConnection();

db.query(`CREATE TABLE IF NOT EXISTS questions
("question_id" serial PRIMARY KEY,
"product_id" INTEGER,
"question_body" VARCHAR(500),
"question_date" VARCHAR(100),
"asker_name" VARCHAR(50),
"asker_email" VARCHAR(50),
"question_helpfulness" INTEGER,
"reported" BOOLEAN)`)
 .then(results => {
  console.log('table QUESTIONS created')
 })
 .catch(err => {
  throw Error(err)
 })

db.query(`CREATE TABLE IF NOT EXISTS answers
  ("answer_id" serial PRIMARY KEY,
  "question_id" INTEGER,
  "body" VARCHAR(500),
  "date" VARCHAR(100),
  "answerer_name" VARCHAR(50),
  "answerer_email" VARCHAR(50),
  "helpfulness" INTEGER,
  "reported" BOOLEAN,
  "question_reported_id" INTEGER,
   CONSTRAINT answers_question_id_fkey FOREIGN KEY
   (question_id) REFERENCES questions (question_id)
   MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
   CONSTRAINT answers_question_reported_id_fkey FOREIGN KEY
   (question_reported_id) REFERENCES reported_questions (question_id)
   MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)`
)
.then(results => {
  console.log('table ANSWERS created')
 })
 .catch(err => {
  throw Error(err)
  console.log(err)
 })

db.query(`CREATE TABLE IF NOT EXISTS reported_questions
("question_id" serial PRIMARY KEY,
"product_id" INTEGER,
"question_body" VARCHAR(500),
"question_date" VARCHAR(100),
"asker_name" VARCHAR(50),
"asker_email" VARCHAR(50),
"question_helpfulness" INTEGER,
 "reported" BOOLEAN)`)
 .then(results => {
  console.log('table REPORTEDQ created')
 })
 .catch(err => {
  throw Error(err)
 })
 //commentfor new commit

 db.query(`CREATE TABLE IF NOT EXISTS reported_answers
   ("answer_id" serial PRIMARY KEY,
   "question_id" INTEGER,
   "body" VARCHAR(500),
   "date" VARCHAR(100),
   "answerer_name" VARCHAR(50),
   "answerer_email" VARCHAR(50),
   "helpfulness" INTEGER,
   "reported" BOOLEAN,
   "Photos" text ARRAY,
   "question_reported_id" INTEGER,
   CONSTRAINT reported_answers_question_id_fkey FOREIGN KEY
   (question_id) REFERENCES questions (question_id)
   MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
   CONSTRAINT reported_answers_question_reported_id_fkey FOREIGN KEY
   (question_reported_id) REFERENCES reported_questions (question_id)
   MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)`
)
.then(results => {
  console.log('table REPORTEDA created')
 })
 .catch(err => {
  throw Error(err)
 })

module.exports = {db}



