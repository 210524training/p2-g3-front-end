import InterestInterface from './interests';

export enum MediaHeader {
  IMAGE,
  VIDEO,
};

export type SecurityQuestion = {
  question: string,
  answer: string,
};

export const InterestValues = Object.keys(InterestInterface);

export type InterestType = typeof InterestInterface;
export type Interest = keyof InterestType;

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
  title: string,
  users: ChatRoomUser[],
  messages: Message[],
  lastMessage: Message,
};
