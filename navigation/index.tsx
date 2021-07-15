/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { ColorSchemeName, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { generate as shortid } from 'shortid';

import { View } from '../components/Themed';
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
import ForumScreen from '../screens/ForumScreen';
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
          title: t('_name'),
          headerRight: () => {
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
                {/* <DDC
                  render={(
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={22}
                      color={Colors[colorScheme].background}
                    />
                  )}
                  items={[
                    { key: `profile-${shortid()}`, render: (<Text>{t('profile')}</Text>), onClick: () => { alert('item 3 clicked'); } },
                    { key: `settings-${shortid()}`, render: (<Text>{t('settings')}</Text>), onClick: () => { alert('item 4 clicked'); } },
                    { key: `close-${shortid()}`, render: (<Text>{t('close')}</Text>), onClick: () => { console.log('close dropdown'); } },
                  ]}
                /> */}
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
          headerRight: () => (
            <View style={{
              backgroundColor: Colors[colorScheme].tint,
              alignItems: 'center',
              width: 50,
            }}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={Colors[colorScheme].background}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
      />
      <Stack.Screen
        name="ForumScreen"
        component={ForumScreen}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
      />
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
