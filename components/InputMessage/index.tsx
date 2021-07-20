import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Image, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { Entypo, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import * as Progress from 'react-native-progress';

import useColorScheme from '../../hooks/useColorScheme';
import createStyle from './style';
import Colors from '../../constants/Colors';
import { isVideo } from '../Media';
import t from '../../Localization';
import { Camera } from 'expo-camera';
import { MediaHeader, User } from '../../@types/index.d';
import { selectUser, UserState } from '../../hooks/slices/user.slice';
import { useAppSelector } from '../../hooks';

export type InputMessageProps = {
  socket?: WebSocket,
  beforeMessageSent?: () => void,
  afterMessageSent?: () => void
};

const InputMessage: React.FC<InputMessageProps> = ({ socket, beforeMessageSent, afterMessageSent }): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const nav = useNavigation();
  // const [grantedMicAccess, setGrantedMicAccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestMicrophonePermissionsAsync();
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const onMessageChangeHandler = (text: string) => {
    setMessage(text);
  };

  const onSendPressed = () => {
    if (message) {
      console.log('send:', message);
      if (user && socket) {
        beforeMessageSent && beforeMessageSent();
        sendMessage(message, socket, user);
        afterMessageSent && afterMessageSent();
      } else if (!user) {
        Alert.alert('Please sign in to send a message');
      }
      setMessage('');
    } else {
      console.log('activate microphone');
      // 
    }
  };

  const handleAttachementPress = () => {
    console.log('attach file');
    (async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      console.log(result);

      if (user && socket && !result.cancelled) {
        await sendMedia(result.uri, user, socket, (total: number) => {
          console.log(total, '%');
          setUploadProgress(total);
          if (total >= .99) {
            setUploadProgress(-1);
          }
        });
      }
    })();
  };

  const handleCameraPress = () => {
    console.log('open camera');
    nav.navigate('Camera', {
      socket,
      uploadProgress: (total: number) => {
        console.log(total, '%');
        setUploadProgress(total);
        if (total >= .99) {
          setUploadProgress(-1);
        }
      },
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={{ width: '100%' }}
      >
        {uploadProgress > 0 && uploadProgress < 1 ? <Progress.Bar progress={uploadProgress} width={null} /> : undefined}
        <View style={styles.container}>
          <View style={styles.main}>
            <TextInput
              style={styles.inputField}
              multiline
              placeholder={t('typeAMessage')}
              value={message}
              onChangeText={onMessageChangeHandler}
            />
            <Pressable
              onPress={handleAttachementPress}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1
                }
              ]}
            >
              <Entypo
                name="attachment"
                size={24}
                color='grey'
                style={styles.icon}
              />
            </Pressable>

            {
              !message &&
              <Pressable
                onPress={handleCameraPress}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1
                  }
                ]}
              >
                <Fontisto
                  name="camera"
                  size={24}
                  color='grey'
                  style={styles.icon}
                />
              </Pressable>
            }
          </View>
          <Pressable
            onPress={onSendPressed}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1
              }
            ]}>

            <View style={styles.buttonContainer}>
              <Ionicons
                name="send"
                size={24}
                color={Colors[colorScheme].background}
              />
              {/* {
              message
                ? (
                  <Ionicons
                    name="send"
                    size={24}
                    color={Colors[colorScheme].background}
                  />
                )
                : (
                  <MaterialCommunityIcons
                    name="microphone"
                    size={28}
                    color={Colors[colorScheme].background}
                  />
                )
            } */}
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export const sendMessage = (message: string, socket: WebSocket, user: User): void => {
  socket.send(JSON.stringify({
    action: 'sendmessage',
    data: JSON.stringify({
      id: uuid(),
      user: user,
      content: message,
      createdAt: new Date().toISOString(),
    }),
  }));
};

export const sendMedia = async (
  uri: string,
  user: User,
  socket: WebSocket,
  uploadProgress: (total: number) => void
): Promise<string | null> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const result = await Storage.put(uuid(), blob, {
      contentType: blob.type,
      contentLength: blob.size,
      progressCallback(progress: any) {
        uploadProgress(progress.loaded / progress.total);
      },
    });

    console.log(result);
    if (result && result.key) {
      const { key } = result;
      const signedUrl = await Storage.get(key);
      const header = blob.type.startsWith('video') ? 'video' : 'img';
      const newMessage = `<${header}:${signedUrl}>`;
      console.log(newMessage);
      sendMessage(newMessage, socket, user);
      return key;
    } else {
      Alert.alert('Failed to retrieve file signature.');
    }
  } catch (err) {
    console.log('Error uploading file:', err);
    Alert.alert('Error uploading file:', err.message);
  }

  return null;
};

export default InputMessage;