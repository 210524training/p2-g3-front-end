import React from 'react';
import { View } from 'react-native';
import { Forum } from '../../@types';
import useColorScheme from '../../hooks/useColorScheme';
import LeftContainer from './LC';
import MainContainer from './MC';
import createStyle from './styles';

export type ForumProps = {
  forum: Forum;
};

const ForumView: React.FC<ForumProps> = ({ forum }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  return (
    <View style={styles.contianer}>
      <LeftContainer user={forum.user} />
      <MainContainer forum={forum} />
    </View>
  );
};

export default ForumView;