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
  email: string,
  username: string,
  password: string,
  contacts?: User[],
  interests: Interest[],
  isSuperAdmin: boolean,
  chatRooms?: ChatRoomId[],
  imageUri?: string,
  securityQuestionOne: SecurityQuestion,
  securityQuestionTwo: SecurityQuestion,
  securityQuestionThree: SecurityQuestion,
  status?: string,
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

export interface Forum {
  id: string,
  title: string,
  tags?: string[],
  user: User,
  createdAt: string,
  content: string,
  likes: number,
  numberOfComments?: number,
  comments?: ForumComment[]
};

export interface ForumComment {
  id: string,
  user: User,
  createdAt: string,
  content: string,
  likes: number,
  numberOfComments?: number,
  comments?: ForumComment[]
};