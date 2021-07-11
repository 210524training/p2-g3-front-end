import { ChatRoom } from '../../@types';
import rooms from '../data/ChatRoom';

export const getChatRooms = (): Promise<ChatRoom[]> => {
  const chatRooms: ChatRoom[] = rooms;
  return new Promise<ChatRoom[]>((resolve, reject) => {
    resolve(chatRooms);
  });
};
