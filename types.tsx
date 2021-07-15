/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { ChatRoom, Forum, MediaHeader, User } from './@types/index.d';
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
  UploadFile: undefined,
  ForumScreen: {
    forum: Forum,
  },
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
  GeneralDiscussions: undefined;
  Users: undefined;
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