import React from 'react';
import { View, Text } from 'react-native';
import { Forum } from '../../../@types';
import useColorScheme from '../../../hooks/useColorScheme';
import createStyle from '../styles';

export type MCProps = {
  forum: Forum,
};

const MainContainer: React.FC<MCProps> = ({ forum }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  return (
    <View>
      <View>
        <Text>{forum.user.username}</Text>
        <Text>{forum.createdAt}</Text>
      </View>
    </View>
  );
};

export default MainContainer;