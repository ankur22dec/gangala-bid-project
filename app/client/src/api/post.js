import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const post = (endPoint, data) => {
  let token = '';
  let localtoken = localStorage.getItem('token');
  if (localtoken) {
    token = localtoken;
    console.log("token",token)
  }
  return new Promise((resolve, reject) => {
    return axios
      .post(BASE_URL + endPoint, data, {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token
        }
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
