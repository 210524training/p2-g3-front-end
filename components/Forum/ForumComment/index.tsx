import React from 'react';
import { View } from 'react-native';
import { Forum, ForumComment } from '../../../@types';
import useColorScheme from '../../../hooks/useColorScheme';
import LeftContainer from '../LC';
import MainCommentContainer from '../MCC';
import createStyle from './styles';

export type ForumCommentProps = {
  comment: ForumComment,
  forum: Forum,
};

const ForumCommentComponent: React.FC<ForumCommentProps> = ({ forum, comment }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  return (
    <View style={styles.contianer}>
      {/* <LeftContainer user={comment.user} /> */}
      <MainCommentContainer forum={forum} comment={comment} />
    </View>
  );
};

export default ForumCommentComponent;