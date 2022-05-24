import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';
import Cookies from 'js-cookie';

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
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
