/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginCache, selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import defaultImageUri from '../constants/DefaultImageUri';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import EditIcon from '../components/EditProfileIcon/EditIcon';
import LogoutButton from '../components/LogoutButton';
import t from '../Localization';
import { Auth } from 'aws-amplify';

const ProfileScreen: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const dispatch = useAppDispatch();
  const nav = useNavigation();
  React.useEffect(() => {
    console.log('use EFFECT');
    (async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });

        if (currentUser?.username) {
          await dispatch(loginCache({ username: currentUser.username, password: '' }));
        }

      } catch (err) {
        nav.navigate('Login', {
          hideLeftHeader: true,
        });
      }
    })();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {
          user
            ? (
              <>
                <Image source={{
                  uri: user.imageUri?.trim() || defaultImageUri
                }} style={{ width: 100, height: 100, margin: 10, borderRadius: 10 }} />
                <Text style={styles.title}>
                  Hello, {user.username}!
                </Text>
                <Text
                  style={{
                    color: 'blue',
                    padding: 10,
                    textAlign: 'right'
                  }}
                  onPress={() => {
                    nav.navigate('Help');
                  }}
                >
                  {t('help')}
                </Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
                  {user.interests?.join(', ')}
                </Text>
                <LogoutButton />
                <EditIcon />
              </>
            )
            : (
              <Text
                style={{
                  color: 'blue',
                  padding: 10,
                  textAlign: 'right'
                }}
                onPress={() => nav.navigate('Login')}
              >
                {t('login')}
              </Text>
            )
        }
      </View >
    </ScrollView>
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
    color: Colors[colorScheme].text,
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
