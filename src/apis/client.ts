import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';
import Cookies from 'js-cookie';

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://192.168.11.6:3000',
  }),
  options,
);

export const headers = {
  headers: {
    'access-token': Cookies.get('_access_token') || '',
    client: Cookies.get('_client') || '',
    uid: Cookies.get('_uid') || '',
  },
};

export default client;
