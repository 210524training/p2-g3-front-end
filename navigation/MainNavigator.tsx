/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatScreen from '../screens/ChatsScreen';
import { BottomTabParamList } from '../types';
import Media from '../components/Media';
import t from '../Localization';

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
        name="Chats"
        component={ChatScreenNavigator}
        options={{
          title: t('chats')
        }}
      />
      <BottomTab.Screen
        name="Status"
        component={Media}
        options={{
          title: t('status')
        }}
      />
      <BottomTab.Screen
        name="Calls"
        component={TabTwoNavigator}
        options={{
          title: t('calls')
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function ChatScreenNavigator() {
  return (
    <TabOneStack.Navigator headerMode={'none'}>
      <TabOneStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        
        options={{ headerTitle: 'Tab One Title',  }}
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
