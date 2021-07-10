/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const config: LinkingOptions = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
              // search for users
              UsersScreen: 'users',
              RecommendedScreen: 'recommended',
              GeneralDiscussionsScreen: 'discussions',
              RecentChatsScreen: 'chats',
            },
          },
          Cuisine: {
            screens: {
              CuisineScreen: 'cuisine',
              RestaurantsScreen: 'restaurants',
            },
          },
          ChatRoom: {
            screens: {
              ChatRoomScreen: 'chatroom',
              CameraScreen: 'camera',
              EditChatRoomScreen: 'edit-chatroom',
              ViewMediaScreen: 'viewmedia',
              UploadMediaScreen: 'upload-media',
            },
          },
          Profile: {
            screens: {
              LoginScreen: 'login',
              RegisterScreen: 'register',
              ProfileScreen: 'u',
              EditProfileScreen: 'edit-profile',
              HelpScreen: 'help',
              FriendsScreen: 'friends',
            },
          },
        },
      },
      ItemView: {
        screens: {
          ItemView: 'item',
        },
      },
      NotFound: '*',
    },
  },
};

export default config;