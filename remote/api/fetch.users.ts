import { User } from '../../@types';
import client from './client';
import users from '../data/Users';

//TODO: refactor code to use backend

export const getFriends = (id: string): Promise<User[]> => {
  const friends: User[] = users;
  return new Promise<User[]>((resolve, reject) => {
    resolve(friends);
  });
};

export const sendLogin = async (username: string, password: string): Promise<User> => {
  console.log(username, password);

  // const { data: user } = await client.post<User>('/login', {
  //   username,
  //   password,
  // });

  return {

  };
};

export const register = async (user: User) => {

}