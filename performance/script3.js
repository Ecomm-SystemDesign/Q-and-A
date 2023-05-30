import http from "k6/http";
import { sleep, check } from 'k6';

const BASE_URL = 'http://localhost:3000/api/qa'

export const options = {
  stages: [
    { duration: '1s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '1s', target: 0 },
  ],
};
// export default function () {
//   const randomId0 = Math.floor(Math.random() * 3000000 + 2700000);
//   const randomId1 = Math.floor(Math.random() * 3000000 + 2700000);
//   const randomId2 = Math.floor(Math.random() * 3000000 + 2700000);
//   const randomId3 = Math.floor(Math.random() * 3000000 + 2700000);

//   const responses = http.batch([
//     ['GET', `${BASE_URL}/questions/${randomId0}/answers`],
//     ['GET', `${BASE_URL}/questions/${randomId1}/answers`],
//     ['GET', `${BASE_URL}/questions/${randomId2}/answers`],
//     ['GET', `${BASE_URL}/questions/${randomId3}/answers`],

//   ]);
//   responses.forEach(response => {
//     check(response, {
//       'returns list of answers': (res) => res.status === 200
//     })
//   })
//   sleep(1)
// }

export default function () {
  const randomId = Math.floor(Math.random() * 3000000 + 2700000)

  const response = http.get(`${BASE_URL}/questions/${randomId}/answers`)

  check(response, {
    'returns list of questions': (res) => res.status === 200
  })

  // sleep(1)
}