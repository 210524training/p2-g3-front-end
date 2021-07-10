import { RouteProp } from '@react-navigation/native';
import React from 'react';
import Media from '../components/Media';
import { RootStackParamList } from '../types';

type FileViewRouteParams = RouteProp<RootStackParamList, 'FileView'>;

export type FileViewScreenProps = {
  route: FileViewRouteParams,
};  

const FileViewScreen: React.FC<FileViewScreenProps> = ({ route }): JSX.Element => {
  const { uri, type, width, height } = route.params;
  return (
    <>
      <Media mediaType={type} uri={uri} width={width} height={height} />
    </>
  )
};

export default FileViewScreen;