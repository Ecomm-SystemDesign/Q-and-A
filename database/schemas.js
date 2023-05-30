const { db } = require('./db2')

db.connect()
  .then(() => {
    db.query(`CREATE TABLE IF NOT EXISTS questions
    ("question_id" serial PRIMARY KEY,
    "product_id" INTEGER,
    "question_body" VARCHAR(500),
    "question_date" VARCHAR(100),
    "asker_name" VARCHAR(50),
    "asker_email" VARCHAR(50),
    "question_helpfulness" INTEGER,
    "reported" BOOLEAN)`
    )
    .then(() => {
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
      .then(() => {
        db.query(`CREATE TABLE IF NOT EXISTS photos
          ("photo_id" serial PRIMARY KEY,
          "answer_id" INTEGER,
          "photo_url" TEXT,
          CONSTRAINT photos_answer_id_fkey FOREIGN KEY
          (answer_id) REFERENCES answers (answer_id)
          MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)`
        )
        .catch(err => {
          throw Error(err)
        })
      })
    })
  })
  .catch(err => {
    throw Error(err)
  })




