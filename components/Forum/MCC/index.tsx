import { Foundation, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { generate as shortid } from 'shortid';

import { ForumComment } from '../../../@types';
import Colors from '../../../constants/Colors';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../hooks/slices/user.slice';
import useColorScheme from '../../../hooks/useColorScheme';
import DDLText from '../../DDLText';
import ForumTag from '../ForumTag';
import PressableIcon from '../PressebleIcon';
import createStyle from './styles';

export type MCCProps = {
  comment: ForumComment,
};

const MainCommentContainer: React.FC<MCCProps> = ({ comment }): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const isOwner = user?.id === comment.user.id || user?.isSuperAdmin;

  const iconColor = Colors[colorScheme].tabIconDefault;
  const iconSize = 30;

  const handleOnForumDelete = () => {
    console.log('Delete comment');
  };

  const handleOnLikePressed = () => {
    console.log('like comment');
  };

  // const handleOnCommentPressed = () => {
  //   console.log('comment on comment');
  // };

  return (
    <View style={styles.container} key={comment.id+comment.user.id}>
      <View style={styles.header}>
        <Text style={styles.username}>{comment.user.username}&nbsp;
          <Text style={styles.timestamp}>({moment(comment.createdAt).fromNow()})</Text>
        </Text>
        <View style={styles.headerIcons}>
          {!isOwner && (
            <>
              <PressableIcon
                props={{
                  name: 'delete',
                  size: iconSize,
                  color: iconColor,
                }}
                onPress={handleOnForumDelete}
              />
            </>
          )}
        </View>
      </View>

      <View style={styles.content}>        
        <Text style={styles.text}>
          <DDLText text={comment.content} color={Colors[colorScheme].text} />
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text>{comment.likes} <PressableIcon
          IconProvider={Foundation}
          props={{
            name: 'like',
            size: iconSize,
            color: iconColor,
          }}
          onPress={handleOnLikePressed}
        />     </Text>
        {/* <Text>{comment.numberOfComments} <PressableIcon
          IconProvider={Foundation}
          props={{
            name: 'comments',
            size: iconSize,
            color: iconColor,
          }}
          onPress={handleOnCommentPressed}
        /></Text> */}


      </View>
    </View>
  );
};

export default MainCommentContainer;