//import { AWS_API_URL_NEW, AWS_DB_BACKEND } from 'react-native-dotenv';
import { Auth } from 'aws-amplify';
import axios, { AxiosInstance } from 'axios';

const AWS_API_URL_NEW='https://ail0v0u3bg.execute-api.us-east-1.amazonaws.com/dev';
const AWS_DB_BACKEND='https://3ram3us0v4.execute-api.us-east-1.amazonaws.com/dev/';

console.log('Cognito Users:', AWS_API_URL_NEW);
console.log('DB Endpoint', AWS_DB_BACKEND);

export const cognito = async (url = AWS_API_URL_NEW, headers?: any): Promise<AxiosInstance> => {
  const session = await Auth.currentSession();
  console.log(session);
  if (!headers) {
    headers = {};
  }

  if (!('Content-Type' in headers)) {
    headers['Content-Type'] = 'application/json';
  }

  if (!('Authorization' in headers)) {
    headers['Authorization'] = `Bearer ${session.getIdToken().getJwtToken()}`;
  }

  if (!('Date' in headers)) {
    headers['Date'] = new Date().toISOString();
  }

  console.log(headers);
  return axios.create({
    baseURL: url,
    headers,
    withCredentials: true,
  });
};

export const db = async (headers?: any): AxiosInstance => {
  const session = await Auth.currentSession();
  console.log(session);
  if (!headers) {
    headers = {};
  }

  if (!('Content-Type' in headers)) {
    headers['Content-Type'] = 'application/json';
  }

  if (!('Authorization' in headers)) {
    headers['Authorization'] = `Bearer ${session.getIdToken().getJwtToken()}`;
  }

  if (!('Date' in headers)) {
    headers['Date'] = new Date().toISOString();
  }

  return axios.create({
    baseURL: AWS_DB_BACKEND,
    headers,
    withCredentials: true,
  });
};
