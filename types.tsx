/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { ChatRoom, User } from './@types';
import { MediaHeader } from './components/Media';
import Restaurant from './models/restaurant';
import { Cuisine } from './screens/CuisineScreen';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ItemView: {
    restaurant: Restaurant;
  };
  ChatRoom: {
    name: string,
    chatRoom: ChatRoom,
  };
  EditChatRoom: undefined;
  Contacts: {
    user: User,
  };
  Camera: undefined;
  FileView: {
    type: MediaHeader,
    width: number,
    height: number,
    uri: string,
  },
  UploadFile: undefined;

};

export type ChatsParamList = {
  ChatScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Cuisine: undefined;
  Profile: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
<<<<<<< HEAD
  GeneralDiscussions: undefined;
  Users: undefined;
=======
  Login: undefined;
  Register: undefined;
  EditProfile: undefined;
>>>>>>> 1791651 (Edited login, register, profile, edit profile and select interests pages)
};

export type HomeParamList = {
  HomeScreen: undefined;
  RecommendedScreen: undefined;
  RecentChatsScreen: undefined;
};

export type CuisineParamList = {
  CuisineScreen: undefined;
  RestaurantsScreen: {
    cuisine: Cuisine;
  };
};

export type ProfileParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  HelpScreen: undefined;
  FriendsScreen: undefined;
}