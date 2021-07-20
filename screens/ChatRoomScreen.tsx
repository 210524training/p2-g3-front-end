import { WEB_SOCKET_URL } from 'react-native-dotenv';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { generate as shortid } from 'shortid';

import ChatMessage from '../components/ChatMessage';
import InputMessage from '../components/InputMessage';
import { RootStackParamList } from '../types';
import { Message } from '../@types';
console.log(WEB_SOCKET_URL);
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
    const s = new WebSocket(WEB_SOCKET_URL);
    console.log(s);
  

    s.onerror = (e) => {
      console.error('error:', e);
    };

    s.onmessage = (e) => {
      console.log(JSON.parse(e.data).connectionId);
      const msg: Message = JSON.parse(e.data);
      messages.push(msg);
      const ids = messages.map(o => o.id);
      setMessages([
        ...messages,
      ].filter(({id}, index) => !ids.includes(id, index + 1)));
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
        keyExtractor={(item) => shortid()}
      />
      <InputMessage
        socket={socket}
      />
    </>
  );
};

export default ChatRoomScreen;