import http from "k6/http";
import { check, group, sleep, fail } from 'k6';

const BASE_URL = 'http://localhost:3000/api/qa'

export const options = {
  iterations: 1,
};

export default function () {
  group('GET requests', () => {
    const responses = http.batch([
      ['GET', `${BASE_URL}/questions/?product_id=105736&count=100`],
      ['GET', `${BASE_URL}/questions/372017/answers`],
      ['GET', `${BASE_URL}/questions/372014/answers`],
      ['GET', `${BASE_URL}/questions/372015/answers`],
      ['GET', `${BASE_URL}/questions/372016/answers`],

    ]);
  })

  group('answers and questions', () => {

    group('post question', () => {
      const payload = {
        body: 'is this the real life?',
        name: 'defNotABot',
        email: 'realest@email.com',
        product_id: 40644,
      }
      const response = http.post(`${BASE_URL}/questions`, payload)

      check(response, { 'question posted': (r) => r.status === 201 })
    })

    group('post answer', () => {
      const payload = {
        body: 'why yes it does',
        name: 'defNotABot',
        email: 'realest@email.com',
      }
      const response = http.post(`${BASE_URL}/questions/372016/answers`, payload);

      check(response, { 'answer posted': (r) => r.status === 201 })
    })
  })

    // ['PUT', `${BASE_URL}/answers/:answer_id/helpful`]
    // ['PUT', `${BASE_URL}/questions/:question_id/helpful`]
    // ['PUT', `${BASE_URL}/answers/:answer_id/reported`]
    // ['PUT', `${BASE_URL}/questions/:question_id/reported`]
  sleep(1)
}