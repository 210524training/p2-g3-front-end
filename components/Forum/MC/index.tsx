import { Foundation, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { generate as shortid } from 'shortid';

import { Forum } from '../../../@types';
import Colors from '../../../constants/Colors';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../hooks/slices/user.slice';
import useColorScheme from '../../../hooks/useColorScheme';
import DDLText from '../../DDLText';
import ForumComment from '../ForumComment';
import ForumTag from '../ForumTag';
import PressableIcon from '../PressebleIcon';
import createStyle from './styles';

export type MCProps = {
  forum: Forum,
};

const MainContainer: React.FC<MCProps> = ({ forum }): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const isOwner = user?.id === forum.user.id || user?.isSuperAdmin;

  const iconColor = Colors[colorScheme].tabIconDefault;
  const iconSize = 30;

  const handleOnForumEdit = () => {
    console.log('navigate to edit');
  };

  const handleOnForumDelete = () => {
    console.log('Delete forum');
  };

  const handleOnLikePressed = () => {
    console.log('like forum');
  };

  const handleOnCommentPressed = () => {
    console.log('comment on forum');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{forum.user.username}&nbsp;
          <Text style={styles.timestamp}>({moment(forum.createdAt).fromNow()})</Text>
        </Text>
        <View style={styles.headerIcons}>
          {!isOwner && (
            <>
              <PressableIcon
                props={{
                  name: 'edit',
                  size: iconSize,
                  color: iconColor,
                }}
                onPress={handleOnForumEdit}
              />
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
        <Text style={styles.title}>{forum.title}
        </Text>
        
        <Text style={styles.text}><DDLText text={forum.content} color={Colors[colorScheme].text} /></Text>
      </View>
      <View style={styles.tags}>
        {forum.tags?.map((tag) => (<ForumTag key={tag} tag={tag} />))}
      </View>
      <View style={styles.footer}>
        <Text>{forum.likes} <PressableIcon
          IconProvider={Foundation}
          props={{
            name: 'like',
            size: iconSize,
            color: iconColor,
          }}
          onPress={handleOnLikePressed}
        />     </Text>
        <Text>{forum.numberOfComments} <PressableIcon
          IconProvider={Foundation}
          props={{
            name: 'comments',
            size: iconSize,
            color: iconColor,
          }}
          onPress={handleOnCommentPressed}
        /></Text>
      </View>

      <View>
        <FlatList 
          data={forum.comments}
          renderItem={({ item }) => (
            <ForumComment comment={item} />
          )}
        />
      </View>
    </View>
  );
};

export default MainContainer;