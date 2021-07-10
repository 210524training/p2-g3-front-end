/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { MediaHeader } from "./components/Media";
import Restaurant from "./models/restaurant";
import User from "./models/user";
import { Cuisine } from "./screens/CuisineScreen";

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
};

export type BottomTabParamList = {
  Home: undefined;
  Cuisine: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
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
}