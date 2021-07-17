import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import t from '../Localization';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, ChatsParamList, TabTwoParamList } from '../types';
import ChatsScreen from '../screens/ChatsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import MyAccount from '../screens/MyAccount';
import ForumListScreen from '../screens/ForumListScreen';
import UserSearchPage from '../new_pages/UserSearch';
import HelpPage from '../new_pages/HelpPage';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from '../components/CheckBox';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const ios: boolean = Platform.OS === 'ios';
const BottomTab = ios ? createBottomTabNavigator<BottomTabParamList>() : createMaterialTopTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
  const colorScheme = useColorScheme();

  const tabBarOptions = ios
    ? { activeTintColor: Colors[colorScheme].tint }
    : {
      activeTintColor: Colors[colorScheme].background,
      style: {
        backgroundColor: Colors[colorScheme].tint,
      },
      indicatorStyle: {
        backgroundColor: Colors[colorScheme].background,
        height: 2.5
      },
      labelStyle: {
        fontWeight: 'bold',
      },
      showIcon: true,
    };

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={tabBarOptions}
    >
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('profile'),
          tabBarIcon: ios
            ? (({ color }) => (<TabBarIcon name="home-outline" color={color} />))
            : undefined,

        }}
      />

      <BottomTab.Screen
        name="Chats"
        component={ChatScreenNavigator}
        options={{
          title: t('chats'),
          tabBarIcon: ios
            ? (({ color }) => (<TabBarIcon name="home-outline" color={color} />))
            : undefined,
        }}
      />

      <BottomTab.Screen
        name="GeneralDiscussions"
        component={ForumListScreen}
        options={{
          title: t('discussions').substring(0, 8) + '.',
          tabBarIcon: ios
            ? (({ color }) => (<TabBarIcon name="home-outline" color={color} />))
            : undefined,
        }}
      />

      <BottomTab.Screen
        name="UserSearch"
        component={UserSearchPage}
        options={{
          title: t('search'),
          tabBarIcon: ios
            ? (({ color }) => (<TabBarIcon name="home-outline" color={color} />))
            : undefined,
        }}
      />
      
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<ChatsParamList>();

function ChatScreenNavigator() {
  return (
    <TabOneStack.Navigator headerMode={'none'}>
      <TabOneStack.Screen
        name="ChatScreen"
        component={ChatsScreen}

        options={{ headerTitle: 'Tab One Title', }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator headerMode={'none'}>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
