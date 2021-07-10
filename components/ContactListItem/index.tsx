import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { View, Text, Image, Pressable, GestureResponderEvent } from 'react-native';

import defaultImageUri from '../../constants/DefaultImageUri';
import useColorScheme from '../../hooks/useColorScheme';
import { User } from '../../types';
import createStyle from '../ChatListItem/style';

export type ContactListItemProps = {
  user: User,
};

const ContactListItem: React.FC<ContactListItemProps> = ({ user }) => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const nav = useNavigation();

  const onPressHandler = (event: GestureResponderEvent) => {
    // nav.navigate('Profile', {
    //   user
    // });
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
          <Image
            source={{
              uri: user.imageUri || defaultImageUri
            }}
            style={styles.image}
          />
          <View style={styles.containerMetadata}>
            <Text style={styles.title}>{user.name}</Text>
            <Text
              numberOfLines={1}
              style={styles.subtitle}
              ellipsizeMode={'tail'}
            >
              {user.status || 'No status'}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactListItem;