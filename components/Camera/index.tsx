
import React, { useEffect, useRef, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import { Pressable, View, StyleSheet, StyleProp, ViewStyle, PressableStateCallbackType, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MediaHeader } from '../../@types/index.d';
import { selectUser, UserState } from '../../hooks/slices/user.slice';
import { useAppSelector } from '../../hooks';
import t from '../../Localization';
import { sendMedia } from '../InputMessage';

export type CameraProps = {
  socket?: WebSocket,
  uploadProgress?: (total: number) => void,
};

const CameraView: React.FC<CameraProps> = ({ socket, uploadProgress }): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const [hasPermission, setHasPermission] = useState<MediaLibrary.PermissionStatus>();
  const [hasMicPermission, setHasMicPermission] = useState<MediaLibrary.PermissionStatus>();
  const [grantedCameraAccess, setGrantedCameraAccess] = useState<boolean>(false);
  const [grantedMicAccess, setGrantedMicAccess] = useState<boolean>(false);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [pictureMode, setPictureMode] = useState<boolean>(true);
  const [recording, setRecording] = useState<boolean>(false);

  const camera = useRef<Camera>(null);
  const nav = useNavigation();

  useEffect(() => {
    (async () => {
      const cam = await Camera.requestPermissionsAsync();
      const mic = await Camera.requestMicrophonePermissionsAsync();

      setHasPermission(cam.status);
      setHasMicPermission(mic.status);
      setGrantedCameraAccess(cam.status === 'granted');
      setGrantedMicAccess(mic.status === 'granted');
    })();
  }, []);

  const btn: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) = ({
    pressed
  }) => [
    { opacity: pressed ? 0.5 : 1 },
    styles.button
  ];

  const handleTakePicture = () => {
    (async () => {
      if (cameraReady && camera && camera.current && user && socket) {
        console.log('Taking snap');
        const photo = await camera.current.takePictureAsync();
        console.debug(photo);
        nav.goBack();
        nav.navigate('FileView', {
          uri: photo.uri,
          width: photo.width,
          height: photo.height,
          type: MediaHeader.IMAGE
        });
        Alert.alert(
          t('send'),
          t('doYouWantToSendThisPicture'),
          [
            {
              text: t('send'),
              onPress: () => {
                nav.goBack();
                sendMedia(photo.uri, user, socket, (total) => {
                  if (uploadProgress) {
                    uploadProgress(total);
                  }
                }).then(console.log).catch(console.error);
              },
            },
            {
              text: t('cancel'),
            },
          ]
        );

      } else {
        Alert.alert('Camera is not ready');
      }
    })();
  };

  const handleVideoRecording = () => {
    (async () => {
      if (cameraReady && camera && camera.current && user && socket) {
        console.log('Recording video');
        setRecording(true);
        const video = await camera.current.recordAsync();
        console.debug(video);
        nav.goBack();
        nav.navigate('FileView', {
          uri: video.uri,
          type: MediaHeader.VIDEO
        });

        Alert.alert(
          t('send'),
          t('doYouWantToSendThisVideo'),
          [
            {
              text: t('send'),
              onPress: () => {
                nav.goBack();
                sendMedia(video.uri, user, socket, (total) => {
                  if (uploadProgress) {
                    uploadProgress(total);
                  }
                }).then(console.log).catch(console.error);
              },
            },
            {
              text: t('cancel'),
            },
          ]
        );
      } else {
        console.warn('Camera is not ready');
      }
    })();
  };

  const switchMode = () => {
    setPictureMode(!pictureMode);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}
        onCameraReady={() => {
          console.debug('camera ready');
          setCameraReady(true);
        }}
        ref={camera}
      >
        <View style={styles.buttonContainer}>
          <Pressable
            style={btn}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            {/* <Text style={styles.text}> Flip </Text> */}
            {
              type === Camera.Constants.Type.back
                ? <MaterialIcons name="camera-rear" size={60} style={styles.icon} />
                : <MaterialIcons name="camera-front" size={60} style={styles.icon} />
            }

          </Pressable>
          <Pressable
            style={btn}
            onPress={() => {
              if (!recording) {
                if (pictureMode) {
                  handleTakePicture();
                } else {
                  handleVideoRecording();
                }
              } else {
                if (camera && camera.current) {
                  camera.current.stopRecording();
                  setRecording(false);
                }
              }
            }}>
            {/* <Text style={styles.text}> Flip </Text> */}
            {
              !recording
                ? <MaterialIcons name="camera" size={70} style={styles.icon} />
                : <MaterialIcons name="stop" size={70} style={styles.icon} />
            }

          </Pressable>
          <Pressable
            style={btn}
            onPress={switchMode}>
            {/* <Text style={styles.text}> Flip </Text> */}
            {
              !pictureMode
                ? <MaterialIcons name="videocam" size={70} style={styles.icon} />
                : <MaterialIcons name="photo-camera" size={70} style={styles.icon} />
            }

          </Pressable>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    bottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    // height: 100,
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  icon: {
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default CameraView;