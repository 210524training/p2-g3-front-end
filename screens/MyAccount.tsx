import React, { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import { getAllUsers } from '../remote/api/fetch.users';
import DDC from '../components/DropDown';
import PN from '../PN/App';
export default function MyAccountScreen(): JSX.Element {
  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [action, setAction] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      {
        user ?
          <>
            <Text style={styles.title}>
              Hello, {user.username}!
            </Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Button
              title="Logout"
              color="red"
              onPress={() => {
                dispatch(logout());

              }}
            ></Button>
          </> : undefined
      }
      <PN />
    </View >
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
