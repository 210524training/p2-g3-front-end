import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Image, Platform } from 'react-native';
import { Entypo, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import useColorScheme from '../../hooks/useColorScheme';
import createStyle from './style';
import Colors from '../../constants/Colors';
import { isVideo } from '../Media';
import t from '../../Localization';
import { Camera } from 'expo-camera';
import { MediaHeader } from '../../@types/index.d';

export type InputMessageProps = {
  socket?: WebSocket,
  beforeMessageSent?: () => void,
  afterMessageSent?: () => void
};

const InputMessage: React.FC<InputMessageProps> = ({ socket, beforeMessageSent, afterMessageSent }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const nav = useNavigation();
  // const [grantedMicAccess, setGrantedMicAccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

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
      if (socket) {
        beforeMessageSent && beforeMessageSent();
        socket.send(JSON.stringify({
          action: 'sendmessage',
          data: message, // send user dets {}
        }));
        afterMessageSent && afterMessageSent();
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
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        const { uri } = result;
        const video = isVideo(uri);
        let w = 400, h = 400;

        if (!video) {
          Image.getSize(uri, (width, height) => {
            w = width;
            h = height;
            console.log();
          });
        }
        nav.navigate('FileView', {
          type: video ? MediaHeader.VIDEO : MediaHeader.IMAGE,
          uri, width: w * 2, height: h * 2,
        });
      }
    })();
  };

  const handleCameraPress = () => {
    console.log('open camera');
    nav.navigate('Camera');
  };

  return (
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
          {
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
          }
        </View>
      </Pressable>
    </View>
  );
};

export default InputMessage;