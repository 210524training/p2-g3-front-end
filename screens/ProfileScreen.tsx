/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, Image,  } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import { getAllUsers } from '../remote/api/fetch.users';
import defaultImageUri from '../constants/DefaultImageUri';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import EditIcon from '../components/EditProfileIcon/EditIcon';

const ProfileScreen: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const [action, setAction] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  if (!user) {
    nav.navigate('Login');
    return (<></>);
  }

  return (
    <View style={styles.container}>
      <Image source={{
        uri: user.imageUri || defaultImageUri
      }} />
      <Text style={styles.title}>
              Hello, {user.username}!
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{ fontSize: 20 }}>
              User Id
      </Text>
      <Text style={styles.text}>
        {user.id}
      </Text>
      <Text style={{ fontSize: 20 }}>
              Email
      </Text>
      <Text style={styles.text}>
        {user.email}
      </Text>
      <Text style={{ fontSize: 20 }}>
              Interests
      </Text>
      <Text style={styles.text}>
        {user.interests}
      </Text>
      <Button
        title="Logout"
        color={Colors[colorScheme].tint}
        onPress={() => {
          dispatch(logout());

        }}
      ></Button>
      <EditIcon />
    </View >
  );
};

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  text: { 
    borderWidth: 1,
    color: Colors[colorScheme].background,
    fontSize: 18, 
    margin: 10,
    padding: 10, 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
