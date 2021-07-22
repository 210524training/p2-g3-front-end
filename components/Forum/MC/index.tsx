import { Foundation, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { View, Text, Image, FlatList, Button } from 'react-native';
import { generate as shortid } from 'shortid';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

import { Forum, ForumComment as Comment, User } from '../../../@types';
import Colors from '../../../constants/Colors';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../hooks/slices/user.slice';
import useColorScheme from '../../../hooks/useColorScheme';
import DDLText from '../../DDLText';
import ForumComment from '../ForumComment';
import ForumTag from '../ForumTag';
import PressableIcon from '../PressebleIcon';
import createStyle from './styles';
import { deleteForum, updateForum } from '../../../remote/api/forumAPI';
import t from '../../../Localization';


export type MCProps = {
  forum: Forum,
};

const MainContainer: React.FC<MCProps> = ({ forum }): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const nav = useNavigation();

  const [modalViewComment, setModalViewComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likeCount, setLikeCount] = useState(forum.likes);
  const [currentForum, setCurrentForum] = useState<Forum>({ ...forum });

  const isOwner = user?.username === forum.user.username || user?.isSuperAdmin;

  const iconColor = Colors[colorScheme].tabIconDefault;
  const iconSize = 30;

  const handleOnForumEdit = () => {
    nav.navigate('EditForum', { forum: forum });
  };

  const handleOnForumDelete = () => {
    deleteForum(forum.id);
    nav.navigate('GeneralDiscussions');
  };

  const handleOnLikePressed = () => {
    const nf = { ...currentForum };
    if (nf.likes) {
      nf.likes = nf.likes + 1;
    }
    else {
      nf.likes = 1;
    }
    setLikeCount(nf.likes);
    setCurrentForum(nf);
    updateForum(nf);
  };

  const handleOnCommentPressed = () => {
    setModalViewComment(true);
  };

  const submitComment = () => {
    const newComment: Comment = {
      id: shortid(),
      user: user as User,
      createdAt: new Date().toISOString(),
      content: commentText,
      likes: 0,
      numberOfComments: 0,
      comments: [],
    }
    const nf = { ...currentForum };
    if (nf.comments && nf.comments.length) {
      nf.comments[nf.comments.length] = newComment;
    }
    else { nf.comments = [newComment]; }
    if (nf.numberOfComments) {
      nf.numberOfComments = nf.numberOfComments + 1;
    }
    else {
      nf.numberOfComments = 1;
    }
    setCurrentForum(nf);
    updateForum(nf);
    setModalViewComment(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{currentForum.user.username}&nbsp;
          <Text style={styles.timestamp}>({moment(currentForum.createdAt).fromNow()})</Text>
        </Text>
        <View style={styles.headerIcons}>
          {isOwner && (
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
        <Text style={styles.title}>{currentForum.title}
        </Text>

        <Text style={styles.text}><DDLText text={currentForum.content} color={Colors[colorScheme].text} /></Text>
      </View>
      <View style={styles.tags}>
        {currentForum.tags?.map((tag) => (<ForumTag key={tag} tag={tag} />))}
      </View>
      <View style={styles.footer}>
        <Text>{likeCount} <PressableIcon
          IconProvider={Foundation}
          props={{
            name: 'like',
            size: iconSize,
            color: iconColor,
          }}
          onPress={handleOnLikePressed}
        />     </Text>
        <Text>{currentForum.numberOfComments} <PressableIcon
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
          data={currentForum.comments}
          renderItem={({ item }) => (
            <ForumComment forum={forum} comment={item} />
          )}
        />
      </View>

      <Modal isVisible={modalViewComment}
        animationIn='slideInUp'
        backdropColor='#DDDDDD'
        backdropOpacity={1}
        onBackdropPress={() => { setModalViewComment(false); }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 10,
          width: '100%',
          alignItems: 'center',
        }}>
          <Text style={{
            color: Colors[colorScheme].text,
            fontSize: 12,
            fontWeight: 'bold',
          }}>{t('enterYourComment')}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 10,
          width: '100%',
          alignItems: 'center',
        }}>
          <TextInput
            style={{ backgroundColor: 'white', flex: 1, height: 500 }}
            multiline={true}
            numberOfLines={10}
            onChangeText={(text) => setCommentText(text)}
            placeholder={t('comment')}
            value={commentText}
          />
        </View>
        <Button
          title={t('submit')}
          color={Colors[colorScheme].tint}
          onPress={submitComment}
        />
      </Modal>
    </View>
  );
};

export default MainContainer;