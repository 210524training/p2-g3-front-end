import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, ChatsParamList, TabTwoParamList } from '../types';
import Media from '../components/Media';
import t from '../Localization';
import { createStackNavigator } from '@react-navigation/stack';
import ChatsScreen from '../screens/ChatsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import MyAccount from '../screens/MyAccount';
import UserSearchPage from '../new_pages/UserSearch';

const BottomTab = createMaterialTopTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{
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
      }}
    >
      {/* <BottomTab.Screen
        name="Camera"
        component={CameraView}
        options={{
          tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} size={18} />,
          tabBarLabel: () => null,
        }}
        
      /> */}
      
      <BottomTab.Screen
        name="Profile"
        component={MyAccount}
        options={{
          title: t('profile')
        }}
      />

      <BottomTab.Screen
        name="Chats"
        component={ChatScreenNavigator}
        options={{
          title: t('chats')
        }}
      />

      <BottomTab.Screen
        name="GeneralDiscussions"
        component={MyAccount}
        options={{
          title: t('discussions').substring(0, 8) + '.'
        }}
      />
      
      <BottomTab.Screen
        name="Users"
        component={MyAccount}
        options={{
          title: t('users')
        }}
      />
      <BottomTab.Screen
        name="UserSearch"
        component={UserSearchPage}
        options={{
          title: t('search')
        }}
        />
      {/* <BottomTab.Screen
        name="Calls"
        component={TabTwoNavigator}
        options={{
          title: t('calls')
        }}
      /> */}
    </BottomTab.Navigator>
  );
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
