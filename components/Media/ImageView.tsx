import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable } from 'react-native';
import { MediaHeader } from '../../@types/index.d';

export type ImageViewProps = {
  uri: string,
  width: number,
  height: number,
};

const ImageView: React.FC<ImageViewProps> = ({ uri, width, height }): JSX.Element => {
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