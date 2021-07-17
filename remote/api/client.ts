import axios from 'axios';

// const session = await Auth.currentSession();
// const authHeader = {
//   headers: {
//     Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
//   },
// };

const client = axios.create({
  baseURL: undefined,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default client;