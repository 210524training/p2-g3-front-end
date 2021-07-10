declare module '*.png';
declare module '*.jpg';
declare module 'react-native-pixel-perfect';
import InterestInterface from './interests'

export type Question = string;
export type Answer = string;
export type SecurityQuestion = [Question, Answer];

type Interest = keyof InterestInterface;
export default Interest;

const hey: Interest = ''

export interface User {
  id: string,
  email: string,
  username: string,
  password: string,
  imageUri?: string,
  securityQuestionOne: SecurityQuestion,
  securityQuestionTwo: SecurityQuestion,
  securityQuestionThree: SecurityQuestion,
  interests: Interest[],
  contacts: User[],
  roomsId: string, // ?
};

export interface Message {
  id: string,
  user: User,
  content: string,
  createdAt: string,
};

export interface ChatRoom {
  id: string,
  users: User[],
  messages: Message[],
  lastMessage: Message,
};
