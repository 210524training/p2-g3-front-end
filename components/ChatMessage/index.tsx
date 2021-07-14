import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { generate as shortid } from 'shortid';

import { Message } from '../../@types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import DDLText from '../DDLText';
import Media from '../Media';
import extractHeaderAndURL from '../Media/utils';
import createStyle from './style';

export type ChatMessageProps = {
  message: Message
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }): JSX.Element => {
  const colorScheme = useColorScheme();
  const style = createStyle(colorScheme);
  const user: { id: string } = { id: 'u1' };
  const res = extractHeaderAndURL(message.content);
  
  return (
    <View style={style.container} key={`${user.id}-${message.id}-${shortid()}`}>
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
        }

        {
          res
            ? <Media
              mediaType={res.mediaType}
              uri={res.uri}
              width={100}
              height={100}
            />
            : <DDLText
              text={message.content}
              color={user.id !== message.user.id ? 'black' : Colors[colorScheme].background} 
            />
        }
        <Text style={style.timestamp}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

// const isMedia = (message: string) => {
//   return message.startsWith('<img:') || message.startsWith('<video:')  || message.startsWith('<gif:');
// };

export default ChatMessage;