/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import { getAllUsers } from '../remote/api/fetch.users';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import SelectMultiple from 'react-native-select-multiple';
import CheckBox from '../components/CheckBox';

const SelectInterests: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const nav = useNavigation();

  const handleSumbitInterests = () => {
    nav.navigate('Chats');
  };

  return (
    <ScrollView>
      <Text style={styles.title}>
          Select Your Interests:
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <CheckBox />
      <View style={{ width: '100%', padding: 25 }}>  
        <Button 
          onPress={() => handleSumbitInterests()}
          title="Next"
          color="green"
        />
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

export default SelectInterests;