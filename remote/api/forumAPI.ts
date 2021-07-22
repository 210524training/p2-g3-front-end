import { db } from './client';
import { Forum } from '../../@types/index';
import { getAllUsers } from './fetch.users';

const client = db();

export const getAllForums = async (): Promise<Forum[]> => {
  const { data } = await client.get<Forum[]>('forums');
  const forums: Forum[] = JSON.parse(data.body).forums;
  const users = await getAllUsers();
  for (let i = 0; i < forums.length; i++) {
    forums[i].user = users[users.findIndex(u => u.username === forums[i].username)];
    delete forums[i]['username'];
    if (forums && forums[i] && forums[i].comments) {
      for (let j = 0; j < forums[i].comments.length; j++) {
        forums[i].comments[j].user = users[users.findIndex(u => u.username === forums[i].comments[j].username)];
      }
    }
  }
  console.log(forums[0]);
  return forums;
};

export const getForumByID = async (id: string): Promise<Forum> => {
  const { data } = await client.get<Forum>(`forums/${id}`);
  const users = await getAllUsers();
  const forum = JSON.parse(data.body).forum;
  forum.user = users[users.findIndex(u => u.username === forum.username)];
  delete forum['username'];
  for (let j = 0; j < forum.comments.length; j++) {
    forum.comments[j].user = users[users.findIndex(u => u.username === forum.comments[j].username)];
  }
  return forum;
};

export const deleteForum = async (id: string): Promise<boolean> => {
  const { data } = await client.delete<boolean>(`forums/${id}`);
  console.log('deleted forum', data);
  return data;
};

export const updateForum = async (forum: Forum): Promise<boolean> => {
  const { data } = await client.put<boolean>('forums', {
    id: forum.id,
    title: forum.title,
    tags: forum.tags,
    username: forum.user.username,
    createdAt: forum.createdAt,
    content: forum.content,
    likes: forum.likes,
    numberOfComments: forum.numberOfComments,
    comments: forum.comments,
  });
  console.log('updated forum', data);
  return data;
};

export const addForum = async (forum: Forum): Promise<boolean> => {
  const { data } = await client.post<boolean>('forums', JSON.stringify({
    id: forum.id,
    title: forum.title,
    tags: forum.tags,
    username: forum.user.username,
    createdAt: new Date().toISOString(),
    content: forum.content,
    likes: forum.likes,
    numberOfComments: forum.numberOfComments,
    comments: forum.comments,
  }));
  console.log('added forum', data);
  return data;
};
