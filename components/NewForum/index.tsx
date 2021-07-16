import React from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import useColorScheme from '../../hooks/useColorScheme';
import createStyle from './style';

export type NewForumProps = {

};

const NewForum: React.FC<NewForumProps> = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const nav = useNavigation();

  const handleNewForum = () => {
    nav.navigate('Contacts');
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleNewForum}
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 }
        ]}
        hitSlop={10}
      >
        <MaterialCommunityIcons
          name='forum'
          size={28}
          color='white'
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default NewForum;