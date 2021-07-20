import { db } from './client';
import { Forum } from '../../@types/index';

const client = db();

export const getAllForums = async (): Promise<Forum[]> => {
    const {data} =  await client.get<Forum[]>('forums');
    return data;
}

export const getForumByID = async (id: string): Promise<Forum> => {
    const {data} = await client.get<Forum>(`forums/${id}`);
    return data;
}

export const deleteForum = async (id: string): Promise<boolean> => {
    const {data} = await client.delete<boolean>(`forums/${id}`);
    return data;
}

export const updateForum = async (forum: Forum): Promise<boolean> => {
    const {data} = await client.put<boolean>('forum', {
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
    return data;
}

export const addForum = async (forum: Forum): Promise<boolean> => {
    const {data} = await client.post<boolean>('forum', {
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
    return data;
}
