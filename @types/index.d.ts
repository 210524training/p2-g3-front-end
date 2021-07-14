import InterestInterface from './interests';

export enum MediaHeader {
  IMAGE,
  VIDEO,
};

export type SecurityQuestion = {
  question: string,
  answer: string,
};

type Interest = keyof InterestInterface;
export default Interest;

export type ChatRoomId = string;
export interface User {
  id: string,
  email: string,
  username: string,
  password: string,
  contacts: User[],
  interests: Interest[],
  isSuperAdmin: boolean,
  chatRooms: ChatRoomId[],
  imageUri?: string,
  status?: string,
  securityQuestionOne: SecurityQuestion,
  securityQuestionTwo: SecurityQuestion,
  securityQuestionThree: SecurityQuestion,
};

export interface Message {
  id: string,
  user: User,
  content: string,
  createdAt: string,
};

export type ChatRoomUser = {
  user: User,
  isModerator: boolean,
  isAdmin: boolean,
}

export interface ChatRoom {
  id: string,
  users: ChatRoomUser[],
  messages: Message[],
  lastMessage: Message,
};
