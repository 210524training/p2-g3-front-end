import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import { ChatRoom, Message, User } from '../types';
import { getChatRooms } from '../remote/api/fetch.chat.rooms';
import NewMessage from '../components/NewMessage';

export default function TabOneScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    getChatRooms().then(setChatRooms).catch(console.error);
  }, [chatRooms]);

  return (
    <View style={styles.container}>
      {
        chatRooms.length > 0
          ? (
            <FlatList
              style={{ width: '100%' }}
              data={chatRooms}
              renderItem={({ item }) => (
                <ChatListItem chatRoom={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text>No Chats</Text>
          )
      }
      <NewMessage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
