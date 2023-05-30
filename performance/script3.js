import http from "k6/http";
import { sleep, check } from 'k6';

const BASE_URL = 'http://localhost:3000/api/qa'

export const options = {
  stages: [
    { duration: '2s', target: 1000 },
    { duration: '27s', target: 1000 },
    { duration: '1s', target: 0 },
  ],
};
export default function () {
  const randomId0 = Math.floor(Math.random() * 100000 + 900000);
  const randomId1 = Math.floor(Math.random() * 100000 + 900000);
  const randomId2 = Math.floor(Math.random() * 100000 + 900000);
  const randomId3 = Math.floor(Math.random() * 100000 + 900000)

  const responses = http.batch([
    ['GET', `${BASE_URL}/questions/${randomId0}/answers`],
    ['GET', `${BASE_URL}/questions/${randomId1}/answers`],
    ['GET', `${BASE_URL}/questions/${randomId2}/answers`],
    ['GET', `${BASE_URL}/questions/${randomId3}/answers`],

  ]);
  responses.forEach(response => {
    check(response, {
      'returns list of answers': (res) => res.status === 200
    })
  })
  sleep(1)
}