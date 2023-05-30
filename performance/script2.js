import http from "k6/http";
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '2s', target: 1000 },
    { duration: '27s', target: 1000 },
    { duration: '1s', target: 0 },
  ],
};


export default function () {
  const randomId = Math.floor(Math.random() * 3000000 + 2700000)

  const response = http.get(`http://localhost:3000/api/qa/questions/?product_id=${randomId}&count=100`)

  check(response, {
    'returns list of questions': (res) => res.status === 200
  })

  //sleep(1)
}