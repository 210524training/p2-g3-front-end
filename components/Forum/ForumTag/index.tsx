import React from 'react';
import { Text } from 'react-native';
import useColorScheme from '../../../hooks/useColorScheme';
import createStyle from './styles';

export type ForumTagProps = {
  tag: string,
};

const ForumTag: React.FC<ForumTagProps> = ({ tag }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  return (<Text key={tag} style={styles.tag}>{tag}</Text>);
};

export default ForumTag;