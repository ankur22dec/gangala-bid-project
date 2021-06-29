import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const deleteApi = (endPoint) => {
  let token = '';
  let localtoken = localStorage.getItem('token');
  if (localtoken) {
    token = localtoken;
  }
  return new Promise((resolve, reject) => {
    return axios
      .delete(BASE_URL + endPoint, {
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
