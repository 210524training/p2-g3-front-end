import { User } from '../../@types';
import { cognito } from './client';
import { Auth, API } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

/**
 * 
 * @deprecated 
 */
export const getFriends = (username: string): Promise<User[]> => {
  const friends: User[] = [];
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
  try {
    const res = await (await cognito()).get('/users');
    // console.log('fetch all users', res);
    const users: User[] = res?.data?.Users?.map((cu) => ({
      id: cu?.Username,
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
      contacts: extractAttribute(cu, 'custom:contacts') || [],
      chatRoomIds: extractAttribute(cu, 'custom:chatRoomIds') || [],
    })) || [];

    for (let i = 0; i < users.length; i++) { // O(n)
      const contacts = users[i].contacts;
      const newContacts: User[] = [];
      if (contacts) {
        for (let j = 0; j < contacts.length; j++) { // O(n)
          const idx = users.findIndex(u => u.username === contacts[j].username); // O(n) = O(n^3) - oof
          const contact = users[idx];
          newContacts.push(contact);
        }
      }
      users[i].contacts = newContacts;
    }
    return users;
  } catch (err) {
    console.error('fetch users error', err);
  }
  return [];
};


export const sendLogin = async (username: string, password: string): Promise<User> => {
  // console.log(username, password);
  const users = await getAllUsers();
  return Auth.signIn(username, password).then((cu: CognitoUser) => {
    const values = cu.signInUserSession.idToken.payload;
    const friends = JSON.parse(values['custom:contacts'] || '[]');
    const contacts = users.filter(c => friends.includes(
      c.username.startsWith('*') || c.username.startsWith('~')
        ? c.username.substring(1, c.username.length)
        : c.username
    ));
    const crids = JSON.parse(values['custom:chatRoomIds'] || '[]');
    return {
      id: values['cognito:username'] as string,
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
      contacts: contacts || [],
    };
  });
};

export const sendLoginCache = async (): Promise<User> => {
  const users = await getAllUsers();
  return Auth.currentAuthenticatedUser({
    bypassCache: true,
  }).then((cu: CognitoUser) => {
    const values = cu.signInUserSession.idToken.payload;
    const friends = JSON.parse(values['custom:contacts'] || '[]');
    const contacts = users.filter(c => friends.includes(
      c.username.startsWith('*') || c.username.startsWith('~')
        ? c.username.substring(1, c.username.length)
        : c.username
    ));
    const crids = JSON.parse(values['custom:chatRoomIds'] || '[]');

    return {
      id: values['cognito:username'] as string,
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
      contacts: contacts || [],
    };
  });
};

export const updateAttributes = async (cognitoUser: any, user: User): Promise<boolean> => {
  try {
    const res = await Auth.updateUserAttributes(cognitoUser, {
      'custom:imageUri': user.imageUri || '',
      'custom:isSuperAdmin': user.isSuperAdmin ? '1' : '',
      'custom:interests': JSON.stringify(user.interests),
      'custom:status': user.status,
      'custom:questionOne': user.securityQuestionOne.question,
      'custom:questionTwo': user.securityQuestionTwo.question,
      'custom:questionThree': user.securityQuestionThree.question,
      'custom:answerOne': user.securityQuestionOne.answer,
      'custom:answerTwo': user.securityQuestionTwo.answer,
      'custom:answerThree': user.securityQuestionThree.answer,
      'custom:phoneNumber': user.phoneNumber || '',
      'custom:contacts': JSON.stringify(user.contacts?.map(_c => _c.username) || []),
      'custom:chatRoomId': user.chatRooms || '[]',
    });
    console.debug(res);
    return true;
  } catch (err) {
    console.error('update failed (cognito attributes): ', err);
  }
  return false;

};

export const updateStatus = async (cognitoUser: any, status: string): Promise<boolean> => {
  try {
    const res = await Auth.updateUserAttributes(cognitoUser, {
      'custom:status': status,
    });
    return res === 'SUCCESS';
  } catch (err) {
    console.error('update failed (cognito attributes - status): ', err);
  }
  return false;

};