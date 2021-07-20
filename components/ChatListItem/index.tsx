import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import { ChatRoom } from '../../@types';
import defaultImageUri from '../../constants/DefaultImageUri';
import { useAppSelector } from '../../hooks';
import { selectUser, UserState } from '../../hooks/slices/user.slice';
import useColorScheme from '../../hooks/useColorScheme';
import createStyle from './style';

export type ChatListItemProps = {
  chatRoom: ChatRoom,
};

const ChatListItem: React.FC<ChatListItemProps> = ({ chatRoom }) => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const nav = useNavigation();

  const onPressHandler = () => {
    nav.navigate('ChatRoom', {
      name: chatRoom.title || (chatRoom.users.length >  1
        ? chatRoom.users.filter(cu => cu.user.username !== user?.username)[0].user.username
        : 'Empty'),
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
              uri: chatRoom.users.filter(cu => cu.user.username !== user?.username)[0]?.user?.imageUri || defaultImageUri
            }}
            style={styles.image}
          />
          <View style={styles.containerMetadata}>
            <Text style={styles.title}>{chatRoom.users[1].user.username}</Text>
            <Text
              numberOfLines={1}
              style={styles.subtitle}
              ellipsizeMode={'tail'}
            >
              {
                chatRoom?.messages && chatRoom.messages.length > 0
                  ? (
                    chatRoom.messages[chatRoom.messages.length - 1].user.username === user?.username
                      ? 'You:'
                      : chatRoom.messages[chatRoom.messages.length - 1].user.username
                  ) : undefined
              } {
                chatRoom?.messages && chatRoom.messages.length > 0
                  ? chatRoom.messages[chatRoom.messages.length - 1].content
                  : 'No messages'
              }
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