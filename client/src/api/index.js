import { restURL } from './baseURL';
import axios from 'axios';

export function getChatMessagesReq(offset = 0) {
  return axios
    .get(`${restURL}/chat/?offset=${offset}`)
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

export function postChatMessageReq(message) {
  return axios
    .post(`${restURL}/chat`, message)
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

export function deleteChatMessageReq(id) {
  return axios
    .delete(`${restURL}/chat/${id}`)
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
