import { ChatRoom } from '../../types';
import chats from '../data/Chats';


export const getChat = (id: string): Promise<ChatRoom> => {
  const chat: ChatRoom = {
    ...chats,
    lastMessage: {
      id: 'm1',
      content: 'Hello',
      createdAt: new Date().toLocaleDateString(),
      user: {
        id: '1',
        name: 'Dustin',
        imageUri: '',
      }
    }
  };

  return new Promise<ChatRoom>((resolve, reject) => {
    resolve(chat);
  });
};