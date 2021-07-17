import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../hooks';
import { logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import PN from '../utils/PN/App';
import { Auth } from '@aws-amplify/auth/lib-esm/Auth';
export default function MyAccountScreen(): JSX.Element {
  const user = useAppSelector<UserState>(selectUser);

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
                (async () => {
                  await Auth.signOut();
                  dispatch(logout());
                })();
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
