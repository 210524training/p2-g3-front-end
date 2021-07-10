import React from 'react';
import { Text, Image } from 'react-native';
import Link from '../Link';

// https://stackoverflow.com/a/3809435
export const emailExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
export const emailRegex = new RegExp(emailExpression);

export const isUrl = (text: string) => {
  return text.match(emailRegex)
};

export const injectStyling = (sentence: string, color?: string, linkColor?: string): JSX.Element[] => {
  const arr = sentence.trim().split(' ');
  const builder: JSX.Element[] = [];
  for (const word of arr) {
    if (isUrl(word)) {
      builder.push(
        <Link link={word} color={linkColor} />
      );
    } else if (word.startsWith('*') && word.endsWith('*') && word.length > 2) {
      builder.push(
        <Text style={{
          fontWeight: 'bold',
          color,
        }}>
          {word.substring(1, word.length - 1) + ' '}
        </Text>
      );
    } else if (word.startsWith('_') && word.endsWith('_') && word.length > 2) {
      builder.push(
        <Text style={{
          fontStyle: 'italic',
          color,
        }}>
          {word.substring(1, word.length - 1) + ' '} 
        </Text>
      );
    } else {
      builder.push(<Text style={{color}}>{word} </Text>);
    }
  }

  return builder;
};
