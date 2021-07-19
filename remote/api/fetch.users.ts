import { User } from '../../@types';
import client from './client';
import users from '../data/Users';
import { Auth, API } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

export const getFriends = (username: string): Promise<User[]> => {
  const friends: User[] = users;
  return new Promise<User[]>((resolve, reject) => {
    resolve(friends);
  });
};

const extractAttribute = (data: any, find: string): string | undefined => {
  const match = data?.Attributes?.filter((attr: { Name: string, Value: string }) => attr?.Name === find);
  if (match && match.length > 0) {
    return match[0].Value;
  }
  return undefined;
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await (await client()).get('/users');
  return res?.data?.Users?.map((cu) => ({
    username: cu?.Username,
    email: extractAttribute(cu, 'email'),
    password: '<you thought!>',
    isSuperAdmin: !!extractAttribute(cu, 'custom:isSuperAdmin'),
    status: extractAttribute(cu, 'custom:status'),
    interests: JSON.parse(extractAttribute(cu, 'custom:interests') || '[]'),
    imageUri: extractAttribute(cu, 'custom:imageUri'),
    securityQuestionOne: {
      question: extractAttribute(cu, 'custom:questionOne'),
      answer: extractAttribute(cu, 'custom:answerOne'),
    },
    securityQuestionTwo: {
      question: extractAttribute(cu, 'custom:questionTwo'),
      answer: extractAttribute(cu, 'custom:answerTwo'),
    },
    securityQuestionThree: {
      question: extractAttribute(cu, 'custom:questionThree'),
      answer: extractAttribute(cu, 'custom:answerThree'),
    },
    phoneNumber: extractAttribute(cu, 'custom:phoneNumber'),
  })) || [];
};


export const sendLogin = async (username: string, password: string): Promise<User> => {
  console.log(username, password);
  return Auth.signIn(username, password).then((cu: CognitoUser) => {
    const values = cu.signInUserSession.idToken.payload;
    return {
      username: values['cognito:username'] as string,
      email: values['email'] as string,
      password: '<you thought!>',
      isSuperAdmin: values['custom:isSuperAdmin'] ? true : false,
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
      phoneNumber: values['custom:phoneNumber'] as string,
    };
  });
};
