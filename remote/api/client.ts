import { AWS_API_URL, AWS_API_NAME } from 'react-native-dotenv';
import { API, Auth } from 'aws-amplify';
import axios, { AxiosInstance } from 'axios';
import awsmobile from '../../src/aws-exports';


console.log('enpoint', AWS_API_URL);
console.log('api name', AWS_API_NAME);
export const auth = async (headers?: any): Promise<AxiosInstance> => {
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
    baseURL: AWS_API_URL,
    headers,
    withCredentials: true,
  });

  // const path = '/users';
  // const myInit = {
  //   headers: {
  //     Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
  //   },
  // };

  // return await API.post(AWS_API_NAME, path, myInit);
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
