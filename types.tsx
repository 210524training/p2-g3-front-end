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
  EditChatRoom: {
    chatRoom: ChatRoom,
  };
  Contacts: {
    user: User,
  };
  Camera: {
    socket?: WebSocket,
    uploadProgress?: (total: number) => void,
  };
  Register: undefined;
  EditProfile: undefined;
  SelectInterests: undefined;
  PickImage: undefined;
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
  UserSearch: undefined;
  Help: undefined;
  EditForum: {
    forum: Forum,
  }
  ConfirmCode: {
    username: string,
  }
  AddForum: {
    user: User,
  }
  Login: {
    hideLeftHeader: boolean | undefined;
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
  UserSearch: undefined;
  Help: undefined;
  Login: undefined;
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