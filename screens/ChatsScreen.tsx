import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import { getChatRooms } from '../remote/api/fetch.chat.rooms';
import NewMessage from '../components/NewMessage';
import { ChatRoom } from '../@types';

export default function TabOneScreen(): JSX.Element {
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
