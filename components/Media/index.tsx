import React from 'react';
import { View } from 'react-native';
import ImageView from './ImageView';
import VideoPlayer from './VideoPlayer';
import { MediaHeader } from '../../@types/index.d';

export type MediaProps = {
  mediaType: MediaHeader
  uri: string,
  width: number,
  height: number,
};

export const isVideo = (uri: string): boolean => {
  uri = uri.toLowerCase();
  return uri.endsWith('mp4') 
    || uri.endsWith('mov')
    || uri.endsWith('ogg')
    || uri.endsWith('avi')
    || uri.endsWith('webm')
    || uri.endsWith('mpg');

};

const Media: React.FC<MediaProps> = ({ mediaType = MediaHeader.VIDEO, uri, width, height }): JSX.Element => {
  let content;
  switch (mediaType) {
  case MediaHeader.VIDEO:
    content = (
      <VideoPlayer uri={uri} />
    );
    break;
  default:
    content =  (
      <ImageView uri={uri} width={width} height={height} />
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