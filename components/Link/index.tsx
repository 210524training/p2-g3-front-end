import React from 'react';
import { Linking, Pressable, Text } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export type LinkProps = {
  link: string,
  text?: string,
  color?: string,
};

const Link: React.FC<LinkProps> = ({ link, text, color  }): JSX.Element => {
  const colorScheme = useColorScheme();
  return (
    <Pressable
      onPress={() => Linking.openURL(link)}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 }
      ]}
    >
      <Text style={{
        color: color || Colors[colorScheme].tint || 'blue',
        textDecorationLine: 'underline',
      }}>
        { text || link }
      </Text>
    </Pressable>
  );
};

const cutURL = (url: string, maxLen = 40): string => {
  if (url.length >= maxLen) {
    const half = Math.min(url.length / 2);
    const fourth = Math.min(half);
    const start = url.substring(0, fourth);
    const end = url.substring(half + fourth);
    return `${start}...${end}`;
  }

  return url;
};
export default Link;