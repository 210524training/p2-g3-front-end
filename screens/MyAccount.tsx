import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import PN from '../utils/PN/App';
import LogoutButton from '../components/LogoutButton';
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
            <LogoutButton />
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
