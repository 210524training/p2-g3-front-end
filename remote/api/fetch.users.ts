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

export const getAllUsers = (): Promise<User[]> => {
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

  const user = users[0];
  user.username = username;
  user.password = password;

  return new Promise<User>((resolve, reject) => {
    resolve(user);
  });
};

export const register = async (user: User) => {
  return new Promise<User>((resolve, reject) => {
    resolve(user);
  });
};