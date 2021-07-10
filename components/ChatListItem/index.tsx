import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, GestureResponderEvent } from 'react-native';

import defaultImageUri from '../../constants/DefaultImageUri';
import useColorScheme from '../../hooks/useColorScheme';
import { ChatRoom } from '../../types';
import createStyle from './style';

export type ChatListItemProps = {
  chatRoom: ChatRoom,
};

const ChatListItem: React.FC<ChatListItemProps> = ({ chatRoom }) => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const nav = useNavigation();

  const onPressHandler = (event: GestureResponderEvent) => {
    nav.navigate('ChatRoom', {
      name: chatRoom.users[1].name,
      chatRoom
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
          <Image
            source={{
              uri: chatRoom.users[1].imageUri || defaultImageUri
            }}
            style={styles.image}
          />
          <View style={styles.containerMetadata}>
            <Text style={styles.title}>{chatRoom.users[1].name}</Text>
            <Text
              numberOfLines={1}
              style={styles.subtitle}
              ellipsizeMode={'tail'}
            >
              {chatRoom.lastMessage.content}
            </Text>
          </View>
        </View>

        <Text style={styles.timestamp}>
          {
            moment(
              new Date(chatRoom.lastMessage.createdAt).toLocaleDateString(),
              'MM/DD/YY'
            ).fromNow()
          }
          {/* {new Date(chatRoom.lastMessage.createdAt).toLocaleDateString()} */}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatListItem;