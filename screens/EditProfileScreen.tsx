/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../hooks';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { t } from 'i18n-js';
import { Auth } from 'aws-amplify';
import { User } from '../@types/index.d';

const updateAttributes = async (user: User): Promise<boolean> => {
  try {
    const cu = await Auth.currentAuthenticatedUser();
    const res = await Auth.updateUserAttributes(cu, {
      'custom:imageUri': user.imageUri || '',
      'custom:isSuperAdmin': user.isSuperAdmin ? '1' : '',
      'custom:interests': JSON.stringify(user.interests),
      'custom:status': user.status,
      'custom:questionOne': user.securityQuestionOne.question,
      'custom:questionTwo': user.securityQuestionTwo.question,
      'custom:questionThree': user.securityQuestionThree.question,
      'custom:answerOne': user.securityQuestionOne.answer,
      'custom:answerTwo': user.securityQuestionTwo.answer,
      'custom:answerThree': user.securityQuestionThree.answer,
      'custom:phoneNumber': user.phoneNumber || '',
    });
    console.debug(res);
    return true;
  } catch (err) {
    console.error('update failed (cognito attributes): ', err);
  }
  return false;

};

const updateStatus = async (status: string): Promise<boolean> => {
  try {
    const cu = await Auth.currentAuthenticatedUser();
    const res = await Auth.updateUserAttributes(cu, {
      'custom:status': status,
    });
    return res === 'SUCCESS';
  } catch (err) {
    console.error('update failed (cognito attributes): ', err);
  }
  return false;

};

const EditProfileScreen: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const nav = useNavigation();

  const [aboutMe, setAboutMe] = useState<string>(user?.status || '');
  const [error, setError] = useState<string>('');
  const handleSaveProfile = () => {
    (async () => {
      if (aboutMe && aboutMe.trim() && aboutMe.length <= 2048) {
        await updateStatus(aboutMe);
        nav.navigate('Profile');
      } else {
        setError('Either the status was not provided or is too long (max: 2048 characters)');
      }
    })();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>
          Edit Profile
        </Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Text style={{ fontSize: 18 }}>
          {user?.username}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {user?.email}
        </Text>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={{ fontSize: 20 }}>
          {t('status')}
        </Text>
        <TextInput
          style={styles.text}
          placeholder={user?.status}
          value={aboutMe}
          onChangeText={setAboutMe}
        />
        <View style={{ width: '100%', padding: 25 }}>
          <Text
            style={{
              color: 'red',
              textAlign: 'left'
            }}
          >
            {error}
          </Text>
          <Button
            onPress={() => handleSaveProfile()}
            title={t('save')}
            color={Colors[colorScheme].tint}
          />
        </View>
      </View>
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
    color: Colors['dark'].background,
    fontSize: 18,
    margin: 10,
    padding: 10,
    width: '90%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;