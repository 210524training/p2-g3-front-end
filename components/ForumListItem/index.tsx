import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';

import useColorScheme from '../../hooks/useColorScheme';
import createStyle from '../ChatListItem/style';
import { Forum } from '../../@types';

export type ForumListItemProps = {
  forum: Forum,
};

const ContactListItem: React.FC<ForumListItemProps> = ({ forum }) => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const nav = useNavigation();

  const onPressHandler = () => {
    nav.navigate('ForumScreen', {
      forum
    });
  };

  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1
        }
      ]}
    >
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <View style={styles.containerMetadata}>
            <Text style={styles.title}>{forum.title}</Text>
            <Text
              numberOfLines={3}
              style={styles.subtitle}
              ellipsizeMode={'tail'}
            >
              {forum.content}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactListItem;