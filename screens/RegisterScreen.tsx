import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const RegisterScreen: React.FC<unknown> = (props) => {
  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const handleLogin = async () => {
    await dispatch(loginAsync({ username, password }));
    nav.navigate('Home');
  };

  const handleRegister = async () => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        }
      });
      handleLogin();
    } catch (error) {
      console.log('error signing up:', error);
    }
  };
  return (
    <View style={styles.container}>
      {user ? (
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
        </>
      ) : (
        <>
          <Text style={styles.title}>Register</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <View style={{ width: '100%', padding: 25, }}>
            <TextInput
              style={{ fontSize: 18, margin: 10 }}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
              defaultValue={username}
            />
            <TextInput
              style={{ fontSize: 18, margin: 10 }}
              placeholder="email"
              onChangeText={text => setEmail(text)}
              defaultValue={email}
            />
            <TextInput
              style={{ fontSize: 18, margin: 10 }}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              defaultValue={password}
            />

            <Button
              onPress={handleRegister}
              title="Register"
              color="red"
            />
            <Text
              style={{
                color: 'blue',
                padding: 10,
                textAlign: 'right'
              }}
              onPress={() => nav.navigate('LoginScreen')}
            >
              Login?
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
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;