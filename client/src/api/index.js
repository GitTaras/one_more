import { restURL } from './baseURL';
import axios from 'axios';

export function getChatMessagesReq() {
  return axios
    .get(`${restURL}/chat`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw error;
      } else {
        throw error;
      }
    });
}
