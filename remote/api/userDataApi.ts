import { db } from './client';
import { User } from '../../@types/index.d';
import { getAllUsers } from './fetch.users';

const client = db();

export const get = async (): Promise<User[]> => {
  const { data } = await client.get<any>('users');
  const users: User[] = JSON.parse(data.body).users;
  const allUsers = await getAllUsers();
  console.log('all users', users);
  return users;
};

export const getUserDataByID = async (id: string): Promise<{
  id: string,
  contacts: string[],
  chatRoomIds: string[],
}> => {
  const { data } = await client.get<any>(`users/${id}`);
  const user = JSON.parse(data.body).user;
  return user;
};

export const deleteUserData = async (id: string): Promise<boolean> => {
  const { data } = await client.delete<boolean>(`users/${id}`);
  console.log('deleted forum', data);
  return data;
};

export const updateUserData = async (username: string, contacts: string[], chatRoomIds?: string[]): Promise<boolean> => {
  try {
    const { data } = await client.put<boolean>('users', JSON.stringify({
      id: username,
      username: username,
      contacts: contacts || [],
      chatRoomIds: chatRoomIds || [],
    }));
    console.log('updated forum', data);
    return true;
  } catch (err) {
    console.error('update user data error', err);
  }
  return false;
};

export const addUserData = async (username: string): Promise<boolean> => {

  try {
    const { data } = await client.post<boolean>('users', JSON.stringify({
      id: username,
      username: username,
      contacts: [],
      chatRoomIds: [],
    }));
    console.log('added forum', data);
    return true;
  } catch (err) {
    console.error('add user data error', err);
  }
  return false;
};
