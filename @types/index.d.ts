import InterestInterface from './interests';

export enum MediaHeader {
  IMAGE,
  VIDEO,
  /** not implemented yet */
  S3,
};

export type SecurityQuestion = {
  question: string,
  answer: string,
};

export const InterestValues = Object.keys(InterestInterface);

export type InterestType = typeof InterestInterface;
export type Interest = keyof InterestType;

export type ChatRoomId = string;

export interface IEntity {
  id: string;
}
export interface User implements IEntity {
  id?: string,
  email: string,
  phoneNumber?: string,
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

export interface Message implements IEntity {
  id: string,
  user: User,
  content: string,
  createdAt: string,
};

export interface ChatRoomUser implements IEntity  {
  id: string,
  user: User,
  isModerator: boolean,
  isAdmin: boolean,
}

export interface ChatRoom implements IEntity  {
  id: string,
  title: string,
  users: ChatRoomUser[],
  messages: Message[],
  lastMessage: Message,
};

export interface Forum implements IEntity  {
  id: string,
  title: string,
  tags: string[],
  user: User,
  createdAt: string,
  content: string,
  likes?: number,
  numberOfComments?: number,
  comments?: ForumComment[]
};

export interface ForumComment implements IEntity  {
  id: string,
  user: User,
  createdAt: string,
  content: string,
  likes: number,
  numberOfComments?: number,
  comments?: ForumComment[]
};