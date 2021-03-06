import { Foundation, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { generate as shortid } from 'shortid';
import { useState } from 'react';

import { Forum, ForumComment } from '../../../@types';
import Colors from '../../../constants/Colors';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../hooks/slices/user.slice';
import useColorScheme from '../../../hooks/useColorScheme';
import { updateForum } from '../../../remote/api/forumAPI';
import DDLText from '../../DDLText';
import ForumTag from '../ForumTag';
import PressableIcon from '../PressebleIcon';
import createStyle from './styles';
import { useNavigation } from '@react-navigation/native';
import NewForum from '../../NewForum';

export type MCCProps = {
  comment: ForumComment,
  forum: Forum,
};

const MainCommentContainer: React.FC<MCCProps> = ({ forum, comment }): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const [currentForum, setCurrentForum] = useState({ ...forum });
  const [currentComment, setCurrentComment] = useState({ ...comment });

  const nav = useNavigation();

  const isOwner = user?.username === comment.user.username || user?.isSuperAdmin;

  const iconColor = Colors[colorScheme].tabIconDefault;
  const iconSize = 30;

  const handleOnCommentDelete = () => {
    const idx = currentForum.comments?.indexOf(currentComment);
    if (idx != undefined) {
      currentForum.comments?.splice(idx, 1);
<<<<<<< HEAD
      if (currentForum.numberOfComments) {
        currentForum.numberOfComments = currentForum.numberOfComments - 1;
      }
=======
      currentForum.numberOfComments = currentForum.comments?.length;
>>>>>>> 8b355a1752ba9c87de2025c34ee01f4e226f7f26
      setCurrentForum(currentForum);
      updateForum(currentForum);
    }
    nav.navigate('GeneralDiscussions')
  };

  const handleOnLikePressed = () => {
<<<<<<< HEAD
    const idx = currentForum.comments?.indexOf(currentComment);
    currentComment.likes = currentComment.likes + 1;
    if (idx != undefined && currentForum.comments) {
      currentForum.comments[idx] = currentComment;
=======
    const nf = { ...currentForum };
    const nc = { ...currentComment }
    const idxObj = nf.comments?.find(obj => {
      return obj.id === nc.id;
    })
    let idx = undefined;
    if (idxObj != undefined) {
      idx = nf.comments?.indexOf(idxObj);
    }
    console.log(idx)
    nc.likes = nc.likes + 1;
    if (idx != undefined && nf.comments) {
      nf.comments[idx] = nc;
>>>>>>> 8b355a1752ba9c87de2025c34ee01f4e226f7f26
    }
    setCurrentComment(nc);
    setCurrentForum(nf);
    updateForum(nf);
  };

  // const handleOnCommentPressed = () => {
  //   console.log('comment on comment');
  // };

  return (
    <View style={styles.container} key={currentComment.id + currentComment.user.id}>
      <View style={styles.header}>
        <Text style={styles.username}>{currentComment.user.username}&nbsp;
          <Text style={styles.timestamp}>({moment(currentComment.createdAt).fromNow()})</Text>
        </Text>
        <View style={styles.headerIcons}>
          {isOwner && (
            <>
              <PressableIcon
                props={{
                  name: 'delete',
                  size: iconSize,
                  color: iconColor,
                }}
                onPress={handleOnCommentDelete}
              />
            </>
          )}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>
          <DDLText text={currentComment.content} color={Colors[colorScheme].text} />
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>{currentComment.likes} <PressableIcon
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