import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';

import defaultImageUri from '../../constants/DefaultImageUri';
import useColorScheme from '../../hooks/useColorScheme';
import createStyle from '../ChatListItem/style';
import { User } from '../../@types';

export type ContactListItemProps = {
  user: User,
};

const ContactListItem: React.FC<ContactListItemProps> = ({ user }) => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const nav = useNavigation();

  const onPressHandler = () => {
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
            <Text style={styles.title}>{user.username}</Text>
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