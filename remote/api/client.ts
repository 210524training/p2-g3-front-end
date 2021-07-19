import { AWS_API_URL } from 'react-native-dotenv';
import { Auth } from 'aws-amplify';
import axios, { AxiosInstance } from 'axios';

console.log(AWS_API_URL);

export const auth = async (headers?: any): Promise<AxiosInstance> => {
  const session = await Auth.currentSession();
  if (!headers) {
    headers = {};
  }

  if (!('Content-Type' in headers)) {
    headers['Content-Type'] = 'application/json';
  }

  if (!('Authorization' in headers)) {
    headers['Authorization'] = `Bearer ${session.getIdToken().getJwtToken()}`;
  }

  return axios.create({
    baseURL: AWS_API_URL,
    headers,
    withCredentials: true,
  });
};

export const noAuth = (headers?: any): AxiosInstance => {
  if (!headers) {
    headers = {};
  }

  if (!('Content-Type' in headers)) {
    headers['Content-Type'] = 'application/json';
  }

  return axios.create({
    baseURL: AWS_API_URL,
    headers,
    withCredentials: true,
  });
};


export default auth;
