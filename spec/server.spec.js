require('jest');
const request = require('supertest');
const express = require('express')
const app = require('../API');

// 200 for get, 201 for post put

let server;
beforeAll(() => {
  server = app.listen(3001);
});
afterAll((done) => {
  server.close(done);
});

describe('GET /api/qa/questions/', () => {
  it('should return a list of questions', async () => {
    const response = await request(app).get('/api/qa/questions/?product_id=10&count=100');
    expect(response.status).toBe(200)
  })
})

describe('GET /api/qa/questions/:question_id/answers', () => {
  it('should return a list of answers', async () => {
    const response = await request(app).get('/api/qa/questions/100/answers');
    expect(response.status).toBe(200)
  })
})

describe('POST /api/qa/questions/', () => {
  it('should return a list of answers', async () => {
    const response = await request(app).post('/api/qa/questions/');
    //no body, nothing to insert
    expect(response.status).toBe(503)
  })
})

describe('POST /api/qa/:question_id/answers/', () => {
  it('should return a list of answers', async () => {
    const response = await request(app).post('/api/qa/questions/');
    // bad id, nothing to insert
    expect(response.status).toBe(503)
  })
})

describe('PUT /api/qa/questions/:question_id/helpful', () => {
  it('should return a list of answers', async () => {
    const response = await request(app).put('/api/qa/questions/100/helpful');
    expect(response.status).toBe(201)
  })
})

describe('PUT /api/qa//answers/:answer_id/helpful', () => {
  it('should return a list of answers', async () => {
    const response = await request(app).put('/api/qa/answers/100/helpful');
    expect(response.status).toBe(201)
  })
})