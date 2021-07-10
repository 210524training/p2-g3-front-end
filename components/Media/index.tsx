import React from 'react';
import { Image, View } from 'react-native';
import VideoPlayer from './VideoPlayer';
import Layout from '../../constants/Layout'

export type MediaProps = {
  mediaType: MediaHeader
  uri: string,
  width: number,
  height: number,
};

export enum MediaHeader {
  IMAGE,
  GIF,
  VIDEO,
};

export const isVideo = (uri: string) => {
  uri = uri.toLowerCase();
  return uri.endsWith('mp4') 
  || uri.endsWith('mov')
  || uri.endsWith('ogg')
  || uri.endsWith('avi')
  || uri.endsWith('webm')
  || uri.endsWith('mpg')

};

const Media: React.FC<MediaProps> = ({ mediaType = MediaHeader.VIDEO, uri, width, height }): JSX.Element => {
  let content;
  switch (mediaType) {
    case MediaHeader.VIDEO:
      content = (
        <VideoPlayer
          uri={uri}
        />
      );
      break;
    default:
      content =  (
        <Image source={{ uri }} style={{
          width: Layout.perfectSize(width / 8),
          height: Layout.perfectSize(height / 8),
        }} />
      );
      break;
  }
  return (
    <View style={
      {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }
    }>
      {content}
    </View>
  );

};

export default Media;