import React from 'react';
import CameraView from '../components/Camera';

export type CameraScreenProps = {

};

const CameraScreen: React.FC<CameraScreenProps> = (): JSX.Element => {
  return (
    <CameraView />
  );
};

export default CameraScreen;