import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import InputMessage from '../components/InputMessage';
import { v4 as uuid } from 'uuid';
import { RootStackParamList } from '../types';
import { Message } from '../@types';

type ChatRoomScreenRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>;

export type ChatRoomScreenProps = {
  route: ChatRoomScreenRouteProp
};

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route }): JSX.Element => {
  const room = route.params.chatRoom;
  const [messages, setMessages] = useState<Message[]>([]);
  const flatList = useRef<FlatList<Message>>(null);

  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    const s = new WebSocket('wss://5q4qntpmg9.execute-api.us-east-1.amazonaws.com/Prod/');

    s.onerror = (e) => {
      console.error('error:', e);
    };

    s.onmessage = (e) => {
      console.log('res', e);
      const msg: Message = {
        id: uuid(),
        createdAt: new Date().toISOString(),
        user: room.users[1],
        content: e.data as string,
      };
      messages.push(msg);
      setMessages([
        ...messages,
      ]);
    };

    s.onopen = (e) => {
      console.log('onopen', e);
      console.log('connected');
    };

    s.onclose = (e) => {
      console.log(e);
    };

    setSocket(s);
  }, []);

  useEffect(() => {
    console.log(messages.length);
    // TODO: Scroll down only on message sent
    if (flatList && flatList.current && messages.length > 0) {
      flatList.current.scrollToEnd({
        animated: true
      });
    }
  }, [messages]);

  return (
    <>
      <FlatList
        ref={flatList}
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage message={item} />
        )}
        keyExtractor={(item) => uuid()}
        // inverted
      />
      <InputMessage
        socket={socket}
      />
    </>
  );
};

export default ChatRoomScreen;