import { Interest, User } from '../../@types';
import client from './client';
import users from '../data/Users';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
//TODO: refactor code to use backend

export const getFriends = (id: string): Promise<User[]> => {
  const friends: User[] = users;
  return new Promise<User[]>((resolve, reject) => {
    resolve(friends);
  });
};

export const getAllUsers = (): Promise<User[]> => {
  const friends: User[] = users;
  return new Promise<User[]>((resolve, reject) => {
    resolve(friends);
  });
};

export const sendLogin = async (username: string, password: string): Promise<User> => {
  console.log(username, password);
  return Auth.signIn(username, password).then((cu: CognitoUser) => {
    const values = cu.signInUserSession.idToken.payload;
    console.log(values);
    return {
      username: values['cognito:username'] as string,
      email: values['email'] as string,
      password: '<you thought!>',
      isSuperAdmin: values['isSuperAdmin'] ? true : false,
      status: values['custom:status'] as string,
      interests: JSON.parse(values['custom:interests'] ? values['custom:interests'] : '[]'),
      imageUri: values['custom:imageUri'] as string || '',
      securityQuestionOne: {
        question: values['custom:questionOne'] as string,
        answer: values['custom:answerOne'] as string
      },
      securityQuestionTwo: {
        question: values['custom:questionTwo'] as string,
        answer: values['custom:answerTwo'] as string
      },
      securityQuestionThree: {
        question: values['custom:questionThree'] as string,
        answer: values['custom:answerThree'] as string
      },
    };
  });
};

export const register = async (user: User) => {
  return new Promise<User>((resolve, reject) => {
    resolve(user);
  });
};