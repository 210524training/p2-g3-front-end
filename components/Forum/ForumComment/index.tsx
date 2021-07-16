import React from 'react';
import { Forum } from '../../../@types';

export type ForumCommentProps = {
  comment: Forum,
};

const ForumComment: React.FC<ForumCommentProps> = ({ comment }): JSX.Element => {
  return (<></>);
};

export default ForumComment;