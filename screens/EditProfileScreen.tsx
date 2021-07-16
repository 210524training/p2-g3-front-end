/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import { getAllUsers } from '../remote/api/fetch.users';
import defaultImageUri from '../constants/DefaultImageUri';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const EditProfileScreen: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const nav = useNavigation();

  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');

  const handleSaveProfile = () => {
    nav.navigate('Profile');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Edit Profile
        </Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={{ fontSize: 18 }}>
          {user?.id}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {user?.username}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {user?.email}
        </Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={{ fontSize: 20 }}>
          New Password
        </Text>
        <TextInput
          style={styles.text} 
          placeholder="Enter Password"
          onChangeText={text => setPassword(text)}
        />
        <Text style={{ fontSize: 20 }}>
          Confirm New Password
        </Text>
        <TextInput
          style={styles.text}
          placeholder="Re-Enter Password"
          onChangeText={text => setVerifyPassword(text)}
        />
        <Text style={{ fontSize: 20 }}>
          About Me
        </Text>
        <TextInput
          style={styles.text}
          placeholder="Type Here!"
          onChangeText={text => setAboutMe(text)}
        />
        <View style={{ width: '100%', padding: 25 }}>  
          <Button 
            onPress={() => handleSaveProfile()}
            title="Save"
            color="green"
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