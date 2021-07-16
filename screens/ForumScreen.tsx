import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import ForumView from '../components/Forum';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList } from '../types';

export type ForumScreenRouteProp = RouteProp<RootStackParamList, 'ForumScreen'>;

export type ForumScreenProps = {
  route: ForumScreenRouteProp,
};

const ForumScreen: React.FC<ForumScreenProps> = ({ route }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const { forum } = route.params;

  return (
    <ForumView forum={forum} />
  );
};

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({

});
export default ForumScreen;