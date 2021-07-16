import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ForumView from '../components/Forum';
import { RootStackParamList } from '../types';

export type ForumScreenRouteProp = RouteProp<RootStackParamList, 'ForumScreen'>;

export type ForumScreenProps = {
  route: ForumScreenRouteProp,
};

const ForumScreen: React.FC<ForumScreenProps> = ({ route }): JSX.Element => {
  const { forum } = route.params;

  return (
    <ScrollView>
      <ForumView forum={forum} />
    </ScrollView>
  );
};

export default ForumScreen;