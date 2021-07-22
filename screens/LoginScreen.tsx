/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, selectUser, UserState } from '../hooks/slices/user.slice';
import { useNavigation } from '@react-navigation/native';
import t from '../Localization';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LogoutButton from '../components/LogoutButton';

const LoginScreen: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const handleLogin = async () => {
    await dispatch(loginAsync({ username, password }));
    nav.navigate('Chats');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>
            Hello, {user.username}!
          </Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <LogoutButton />
        </>
      ) : (
        <>
          <Text style={styles.title}>Login</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <View style={{ width: '100%', padding: 25, }}>
            <TextInput
              style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}
              placeholder={t('username')}
              onChangeText={text => setUsername(text)}
              defaultValue={username}
            // value={'dustindiaz'}
            />
            <TextInput
              style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}
              placeholder={t('password')}
              onChangeText={text => setPassword(text)}
              defaultValue={password}
            // value={'password12345'}
            />

            <Button
              onPress={handleLogin}
              title={t('login')}
              color={Colors[colorScheme].tint}
            />
            <Text
              style={{
                color: 'blue',
                padding: 10,
                textAlign: 'right'
              }}
              onPress={() => {
                nav.navigate('Register');
              }}
            >
              {t('noAccountRegister')}
            </Text>
          </View>
        </>
      )
      }
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
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default LoginScreen;