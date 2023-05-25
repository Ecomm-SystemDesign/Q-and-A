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
   CONSTRAINT answers_question_id_fkey FOREIGN KEY
   (question_id) REFERENCES questions (question_id)
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
   CONSTRAINT answers_question_id_fkey FOREIGN KEY
   (question_id) REFERENCES questions (question_id)
   MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)`
)
.then(results => {
  console.log('table REPORTEDA created')
 })
 .catch(err => {
  throw Error(err)
 })

module.exports = {db}


// const database = new Sequelize(
//   'qanda',
//   process.env.USER,
//   '',
//   {
//     dialect: 'postgres'
//   });
// const testDbConnection = async () => {
//     try {
//       await database.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   };

// testDbConnection();

// const questions = database.define('questions', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true
//   },
//   product_id: DataTypes.INTEGER,
//   question_body: DataTypes.STRING,
//   question_date: DataTypes.STRING,
//   asker_name: DataTypes.STRING,
//   asker_email: DataTypes.STRING,
//   question_helpfulness: DataTypes.INTEGER,
//   reported: DataTypes.BOOLEAN,
// })

// const answers = database.define('answers', {
//   answer_id: DataTypes.INTEGER,
//   body: DataTypes.STRING,
//   date: DataTypes.STRING,
//   answerer_name: DataTypes.STRING,
//   helpfulness: DataTypes.INTEGER,
//   // Photos: [ {
//   //   photo_url: DataTypes.STRING,
//   // }]
// })

// questions.hasMany(answers, {
//   foreignKey: 'question_id'
// })
// database.sync().then(results => {
//   console.log('success')
// }).catch(err => {
//   console.log(err)
// })

// module.exports = { answers, questions, database }


