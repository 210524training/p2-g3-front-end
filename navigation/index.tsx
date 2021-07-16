/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';
import { View } from '../components/Themed';
import { Octicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './MainNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import useColorScheme from '../hooks/useColorScheme';
import ContactsScreen from '../screens/ContactsScreen';
import CameraScreen from '../screens/CameraScreen';
import FileViewScreen from '../screens/FileViewScreen';
import t from '../Localization';
import DDC from '../components/DropDown';
import EditChatRoom from '../screens/EditChatRoom';
import UserSearchPage from '../new_pages/UserSearch';
import HelpPage from '../new_pages/HelpPage';

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }): JSX.Element => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: Colors[colorScheme].background,
      headerTitleAlign: 'left',
      headerStyle: {
        backgroundColor: Colors[colorScheme].tint,
        shadowOpacity: 0, // ios
        elevation: 0, // android
      },
    }}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          title: t('name'),
          headerRight: () => {
            const nav = useNavigation();
            return (
              <View style={{
                backgroundColor: Colors[colorScheme].tint,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginRight: 10,
                width: 60,
                marginTop: 10,
              }}
              >

                {/* <Octicons
                  name="search"
                  size={22}
                  color={Colors[colorScheme].background}
                /> */}
                {/* <MaterialCommunityIcons
                  name="dots-vertical"
                  size={22}
                  color={Colors[colorScheme].background}
                /> */}
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name || 'No Name',
          headerRight: () => {
            const nav = useNavigation();
            return (
              <View style={{
                backgroundColor: Colors[colorScheme].tint,
                alignItems: 'center',
                width: 50,
              }}>
                <Pressable
                  onPress={() => {
                    nav.navigate('EditChatRoom', {
                      chatRoom: route.params.chatRoom,
                    });
                  }}
                  style={({ pressed }) => [
                    { 
                      opacity: pressed ? 0.5 : 1 
                    }
                  ]}
                >
                  <Feather name="edit" size={24} color={Colors[colorScheme].background} />
                </Pressable>
                
              </View>
            );
          },
        })}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
      />
      <Stack.Screen name="EditChatRoom" component={EditChatRoom} 
        options={({ route }) => ({
          title: route.params.chatRoom.title || 'No Name',
        })} />
      <Stack.Screen
        name="UserSearch"
        component={UserSearchPage}
      />
      <Stack.Screen
        name="Help"
        component={HelpPage}
      />
      <Stack.Screen name="FileView" component={FileViewScreen} options={{ title: 'File View' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
