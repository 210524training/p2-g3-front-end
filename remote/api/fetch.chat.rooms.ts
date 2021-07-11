import { ChatRoom } from '../../types';
import rooms from '../data/ChatRoom';

export const getChatRooms = (): Promise<ChatRoom[]> => {
  const chatRooms = rooms as ChatRoom[];
  return new Promise<ChatRoom[]>((resolve, reject) => {
    resolve(chatRooms);
  });
};
