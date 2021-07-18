/* eslint-disable react-native/no-color-literals */
import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, TextInput, Text } from 'react-native';
import { RootStackParamList } from '../types';

import { Auth } from 'aws-amplify';
import t from '../Localization';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

async function confirmSignUp(username: string, code: string): Promise<boolean> {
  try {
    await Auth.confirmSignUp(username, code);
    return true;
  } catch (error) {
    console.log('error confirming sign up', error);
  }
  return false;
}

async function resendConfirmationCode(username: string): Promise<boolean> {
  try {
    await Auth.resendSignUp(username);
    return true;
  } catch (err) {
    console.log('error resending code: ', err);
  }
  return false;
}

type ConfirmCodeRoute = RouteProp<RootStackParamList, 'ConfirmCode'>

type ConfirmCodeProps = {
  route: ConfirmCodeRoute
}

const ConfirmCode: React.FC<ConfirmCodeProps> = ({ route: { params: { username } } }) => {
  const colorScheme = useColorScheme();
  const nav = useNavigation();

  const [msg, setMsg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const handleOnConfrimPressed = () => {
    setError('');
    setMsg('');
    if (!code) {
      setError('Please provide a confirmation code (check your email)');
    } else {
      confirmSignUp(username, code).then((value) => {
        if (value) {
          setMsg('Success!');
          nav.navigate('Profile');
        } else {
          setError('Wrong confirmation code');
        }
      }).catch((err) => {
        setError('Wrong confirmation code? ' + err.message);
      });
    }
  };

  const handleOnResendPressed = () => {
    setError('');
    setMsg('');
    resendConfirmationCode(username).then((value) => {
      if (value) {
        setMsg('Sent! Check your email.');
      } else {
        setError('An error occured while attempting to send the confirmation email.');
      }
    }).catch((err) => {
      setError('An error occured while attempting to send the confirmation email. ' + err.message);
    });

  };

  return (
    <>
      <Text style={{ fontSize: 18, }}>Check your email, a confirmation code was sent.</Text>
      <TextInput
        style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}
        onChangeText={(text) => setCode(text)}
      />
      <Text style={{ fontSize: 18, color: 'green', }}>{msg}</Text>
      <Text style={{ fontSize: 18, color: 'red', }}>{error}</Text>
      <Button
        onPress={handleOnConfrimPressed}
        title={t('confirm')}
        color={Colors[colorScheme].tint}
      />
      <Text
        style={{
          color: 'blue',
          padding: 10,
          textAlign: 'right'
        }}
        onPress={handleOnResendPressed}
      >
        {t('resendConfirmationCode')}
      </Text>

    </>
  );
};

export default ConfirmCode;