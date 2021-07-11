import axios from 'axios';

const client = axios.create({
  baseURL: undefined,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default client;