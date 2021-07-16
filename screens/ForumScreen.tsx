import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
    <ScrollView><ForumView forum={forum} /></ScrollView>
    
  );
};

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({

});
export default ForumScreen;