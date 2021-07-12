import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { Message } from '../../@types';
import Colors from '../../constants/Colors';

import useColorScheme from '../../hooks/useColorScheme';
import DDLText from '../DDLText';
import createStyle from './style';

export type ChatMessageProps = {
  message: Message
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }): JSX.Element => {
  const colorScheme = useColorScheme();
  const style = createStyle(colorScheme);
  const user: { id: string } = { id: 'u1' };

  return (
    <View style={style.container}>
      <View
        style={
          user.id !== message.user.id
            ? style.message
            : style.outMessage
        }
      >
        {
          user.id !== message.user.id
          && <Text style={style.name}>{message.user.username}</Text>
        }<DDLText text={message.content} color={user.id !== message.user.id ? 'black' : Colors[colorScheme].background} />
        {/* {
          !isMedia
          ? 
          : <Media 
              header={(message.content.split(':')[0] + ':') as MediaHeader} 
              message={message.content} 
            />
        } */}

        
        <Text style={style.timestamp}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

// const isMedia = (message: string) => {
//   return message.startsWith('<img:') || message.startsWith('<video:')  || message.startsWith('<gif:');
// };

export default ChatMessage;