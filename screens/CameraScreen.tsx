import { RouteProp } from '@react-navigation/native';
import React from 'react';
import CameraView from '../components/Camera';
import { RootStackParamList } from '../types';

export type CameraScreenRouteProps = RouteProp<RootStackParamList, 'Camera'>

export type CameraScreenProps = {
  route: CameraScreenRouteProps
};

const CameraScreen: React.FC<CameraScreenProps> = ({ route }): JSX.Element => {
  const { socket, uploadProgress } = route.params;
  return (
    <CameraView socket={socket} uploadProgress={uploadProgress} />
  );
};

export default CameraScreen;