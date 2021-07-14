import React, { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import { getAllUsers } from '../remote/api/fetch.users';

const ProfileScreen: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);

  const [action, setAction] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
              Hello, {user?.username}!
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{ fontSize: 20 }}>
              User Id
      </Text>
      <Text style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}>
        {user?.id}
      </Text>
      <Text style={{ fontSize: 20 }}>
              Email
      </Text>
      <Text style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}>
        {user?.email}
      </Text>
      <Text style={{ fontSize: 20 }}>
              Interests
      </Text>
      <Text style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}>
        {user?.interests}
      </Text>
      <Button
        title="Logout"
        color="red"
        onPress={() => {
          dispatch(logout());

        }}
      ></Button>
    </View >
  );
};

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

export default ProfileScreen;
