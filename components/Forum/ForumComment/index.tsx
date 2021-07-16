import React from 'react';
import { View } from 'react-native';
import { ForumComment } from '../../../@types';
import useColorScheme from '../../../hooks/useColorScheme';
import LeftContainer from '../LC';
import MainCommentContainer from '../MCC';
import createStyle from './styles';

export type ForumCommentProps = {
  comment: ForumComment,
};

const ForumCommentComponent: React.FC<ForumCommentProps> = ({ comment }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  return (
    <View style={styles.contianer}>
      {/* <LeftContainer user={comment.user} /> */}
      <MainCommentContainer comment={comment} />
    </View>
  );
};

export default ForumCommentComponent;