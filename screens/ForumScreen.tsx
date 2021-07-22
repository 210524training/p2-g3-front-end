import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ForumView from '../components/Forum';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList } from '../types';

export type ForumScreenRouteProp = RouteProp<RootStackParamList, 'ForumScreen'>;

export type ForumScreenProps = {
  route: ForumScreenRouteProp,
};

const ForumScreen: React.FC<ForumScreenProps> = ({ route }): JSX.Element => {
  const { forum } = route.params;
  const colorScheme = useColorScheme();

  return (
    <ScrollView>
      <ForumView forum={forum} />
    </ScrollView>
  );
};

export default ForumScreen;