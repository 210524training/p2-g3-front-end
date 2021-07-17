import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { generate as shortid } from 'shortid';

import { Message } from '../../@types';
import Colors from '../../constants/Colors';
import { useAppSelector } from '../../hooks';
import { selectUser, UserState } from '../../hooks/slices/user.slice';
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
  const user = useAppSelector<UserState>(selectUser);
  const res = extractHeaderAndURL(message.content);
 
  return (
    <View style={style.container} key={`${user?.username}-${message.id}-${shortid()}`}>
      <View
        style={
          user?.username !== message.user.username
            ? style.message
            : style.outMessage
        }
      >
        {
          user?.username !== message.user.username
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
              color={user?.username !== message.user.username ? 'black' : Colors[colorScheme].background} 
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