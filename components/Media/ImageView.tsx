import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View, Button, StyleSheet, Pressable } from 'react-native';
import { MediaHeader } from '.';
import useColorScheme from '../../hooks/useColorScheme';
import createStyle from './ImageViewStyles';

export type ImageViewProps = {
  uri: string,
  width: number,
  height: number,
};

const ImageView: React.FC<ImageViewProps> = ({ uri, width, height }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const [dims, setDims] = useState<{ width: number, height: number }>();
  const nav = useNavigation();

  useEffect(() => {
    setDims({
      width, height,
    });
  }, []);

  return (
    <Pressable
      onPress={() => {
        nav.navigate('FileView', {
          type: MediaHeader.IMAGE,
          width,
          height,
          uri,
        });
      }}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 }
      ]}
    >
      <Image source={{ uri }} style={dims} />
    </Pressable>
  );
};

export default ImageView;