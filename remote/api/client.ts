import axios from 'axios';
import { AWS_API_URL } from 'react-native-dotenv';

console.log(AWS_API_URL);

const client = axios.create({
  baseURL: AWS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default client;
// const session = await Auth.currentSession();
// const authHeader = {
//   headers: {
//     Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
//   },
// };