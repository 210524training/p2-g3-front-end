import { FriendRequest, User } from '../../@types/index.d';
import { cognito } from './client';
import { Auth, API } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { getUserDataByID, updateUserData } from './userDataApi';
/**
 * 
 * @deprecated returns nothing
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

    const loop = res?.data?.Users;
    const users: User[] = [];

    for (const cu of loop) {
      const res = await getUserDataByID(cu.Username);
      const _contacts = res.contacts;
      const _chatRoomIds = res.chatRoomIds;
      users.push({
        id: cu?.Username,
        username: cu?.Username,
        email: extractAttribute(cu, 'email') as string,
        password: '<you thought!>',
        isSuperAdmin: !!extractAttribute(cu, 'custom:isSuperAdmin'),
        status: extractAttribute(cu, 'custom:status'),
        interests: JSON.parse(extractAttribute(cu, 'custom:interests') || '[]'),
        imageUri: extractAttribute(cu, 'custom:imageUri'),
        securityQuestionOne: {
          question: extractAttribute(cu, 'custom:questionOne') || '',
          answer: extractAttribute(cu, 'custom:answerOne') || '',
        },
        securityQuestionTwo: {
          question: extractAttribute(cu, 'custom:questionTwo') || '',
          answer: extractAttribute(cu, 'custom:answerTwo') || '',
        },
        securityQuestionThree: {
          question: extractAttribute(cu, 'custom:questionThree') || '',
          answer: extractAttribute(cu, 'custom:answerThree') || '',
        },
        phoneNumber: extractAttribute(cu, 'custom:phoneNumber'),
        contacts: _contacts as User[],
        chatRoomIds: _chatRoomIds,
      });
    }

    for (let i = 0; i < users.length; i++) { // O(n)
      const contacts = users[i].contacts;
      console.log('>>', contacts)
      const newContacts: User[] = [];
      if (contacts) {
        for (let j = 0; j < contacts.length; j++) { // O(n)
          const awaiting = contacts[j].startsWith(FriendRequest.AWAITING);
          const pending = contacts[j].startsWith(FriendRequest.PENDING);
          const idx = users.findIndex(u => {
            console.log(u.username, '===', contacts[j], contacts[j].substring(1, contacts[j].length));
            return awaiting || pending
              ? u.username === contacts[j].substring(1, contacts[j].length)
              : u.username === contacts[j];
          }); // O(n) = O(n^3) - oof
          const contact = users[idx];
          if (awaiting) {
            contact.username = FriendRequest.AWAITING + contact.username;
          } else if (pending) {
            contact.username = FriendRequest.PENDING + contact.username;
          }

          newContacts.push(contact);
          console.log('*', idx, contact);
        }
      }
      users[i].contacts = newContacts;
      console.log('new contacts', newContacts);
    }

    return users;
  } catch (err) {
    console.error('fetch users error', err);
  }
  return [];
};


export const sendLogin = async (username: string, password: string): Promise<User> => {
  return Auth.signIn(username, password).then((cu: CognitoUser) => {
    const values = cu.signInUserSession.idToken.payload;
    let contacts, chatRoomIds;
    getUserDataByID(values['cognito:username']).then((e) => {
      contacts = e.contacts;
      chatRoomIds = e.chatRoomIds;
    }).catch(() => console.log('-'));
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
      chatRooms: chatRoomIds || [],

    };
  });
};

export const sendLoginCache = async (): Promise<User> => {
  return Auth.currentAuthenticatedUser({
    bypassCache: true,
  }).then((cu: CognitoUser) => {
    const values = cu.signInUserSession.idToken.payload;

    let contacts, chatRoomIds;
    getUserDataByID(values['cognito:username']).then((e) => {
      contacts = e.contacts;
      chatRoomIds = e.chatRoomIds;
    }).catch(() => console.log('-'));

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
      chatRooms: chatRoomIds || [],
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


