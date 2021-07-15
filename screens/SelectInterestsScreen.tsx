import React, { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Text, View } from '../components/Themed';
import { getAllUsers } from '../remote/api/fetch.users';

const SelectInterests: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);

  return (
    <View>
      
    </View>
  );
};

export default SelectInterests;