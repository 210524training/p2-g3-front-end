/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

import { Text, View } from '../components/Themed';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../hooks';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import t from '../Localization';
import LogoutButton from '../components/LogoutButton';
import CheckBox, { CheckBoxItem } from '../components/CheckBox';
import { InterestValues } from '../@types/index.d';

const RegisterScreen: React.FC<unknown> = (props) => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const [username, setUsername] = useState<string>('dustindiaz');
  const [password, setPassword] = useState<string>('password12345');
  const [email, setEmail] = useState<string>('hi.dustin.diaz@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState<string>('7874782095');
  const [confirmPassword, setConfirmPassword] = useState<string>('password12345');
  const [questionOne, setQuestionOne] = useState<string>('What was your childhood nickname?');
  const [questionTwo, setQuestionTwo] = useState<string>('What was your childhood nickname?');
  const [questionThree, setQuestionThree] = useState<string>('What was your childhood nickname?');
  const [answerOne, setAnswerOne] = useState<string>('yes');
  const [answerTwo, setAnswerTwo] = useState<string>('yes');
  const [answerThree, setAnswerThree] = useState<string>('yes');
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const handleLogin = async () => {
    // await dispatch(loginAsync({ username, password }));
    nav.navigate('ConfirmCode');
  };

  const tooLong = (...args: any[]): boolean => {
    return JSON.stringify(args).length > 2048;
  };

  const onInterestsChange = (items: CheckBoxItem[]) => {
    const values = items.map(item => item.value);
    setInterests(values);
    console.log(values);
  };

  const handleRegister = async () => {

    if (!(username && password && email && answerOne && answerTwo && answerThree && interests && interests.length > 0)) {
      setError('Missing field');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (tooLong(interests)) {
      setError('Too many interests! Take a chill pill, and select less interests.');
      return;
    }

    try {
      console.log('>>', questionOne);
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          'custom:role': 'User',
          'custom:phoneNumber': phoneNumber,
          'custom:questionOne': questionOne,
          'custom:questionTwo': questionTwo,
          'custom:questionThree': questionThree,

          'custom:answerOne': answerOne,
          'custom:answerTwo': answerTwo,
          'custom:answerThree': answerThree,

          'custom:isSuperAdmin': '',
          'custom:imageUri': '',
          'custom:interests': JSON.stringify(interests),
          'custom:status': 'No status'
        }
      });
      nav.navigate('ConfirmCode', {
        username
      });
      // handleLogin();
    } catch (error) {
      console.log('error signing up:', error);
      setError(error.message);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {user ? (
          <>
            <Text style={styles.title}>
              Hello, {user.username}!
            </Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <LogoutButton />
          </>
        ) : (
          <>
            <Text style={styles.title}>{t('register')}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={{ width: '100%', padding: 25, }}>
              <TextInput
                style={styles.text}
                placeholder={t('email')}
                onChangeText={text => setEmail(text)}
                defaultValue={email}
              />
              <TextInput
                style={styles.text}
                placeholder={t('username')}
                onChangeText={text => setUsername(text)}
                defaultValue={username}
              />
              <TextInput
                style={styles.text}
                placeholder={t('password')}
                onChangeText={text => setPassword(text)}
                defaultValue={password}
              />
              <TextInput
                style={styles.text}
                placeholder={t('confirmPassword')}
                onChangeText={text => setConfirmPassword(text)}
                defaultValue={confirmPassword}
              />
              <TextInput
                style={styles.text}
                placeholder={t('phoneNumber')}
                onChangeText={text => setPhoneNumber(text)}
                defaultValue={phoneNumber}
              />
              <Text
                style={{ fontSize: 18, padding: 10 }}
              >
                Security Questions:
              </Text>
              <Picker
                selectedValue={questionOne}
                style={styles.questions}
                onValueChange={(itemValue, itemIndex) => {
                  const str = itemValue + '';
                  setQuestionOne(str);
                }}
              >
                <Picker.Item label="What was your childhood nickname?" value="What was your childhood nickname?" />
                <Picker.Item label="In what city did you meet your spouse/significant other?" value="In what city did you meet your spouse/significant other?" />
                <Picker.Item label="What is the name of your favorite childhood friend? " value="What is the name of your favorite childhood friend? " />
                <Picker.Item label="What street did you live on in third grade?" value="What street did you live on in third grade?" />
                <Picker.Item label="What school did you attend for sixth grade?" value="What school did you attend for sixth grade?" />
                <Picker.Item label="In what city or town was your first job?" value="In what city or town was your first job?" />
                <Picker.Item label="What was your dream job as a child? " value="What was your dream job as a child? " />
                <Picker.Item label="What is your mother's middle name? " value="What is your mother's middle name? " />
                <Picker.Item label="Where did you vacation last year?" value="Where did you vacation last year?" />
                <Picker.Item label="What was your high school mascot?" value="What was your high school mascot?" />
              </Picker>
              <TextInput
                style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}
                placeholder="Answer"
                onChangeText={text => setAnswerOne(text)}
                defaultValue={answerOne}
              />
              <Picker
                selectedValue={questionTwo}
                style={styles.questions}
                onValueChange={(itemValue, itemIndex) => {
                  const str = itemValue + '';
                  setQuestionTwo(str);
                }}
              >
                <Picker.Item label="What was your childhood nickname?" value="What was your childhood nickname?" />
                <Picker.Item label="In what city did you meet your spouse/significant other?" value="In what city did you meet your spouse/significant other?" />
                <Picker.Item label="What is the name of your favorite childhood friend? " value="What is the name of your favorite childhood friend? " />
                <Picker.Item label="What street did you live on in third grade?" value="What street did you live on in third grade?" />
                <Picker.Item label="What school did you attend for sixth grade?" value="What school did you attend for sixth grade?" />
                <Picker.Item label="In what city or town was your first job?" value="In what city or town was your first job?" />
                <Picker.Item label="What was your dream job as a child? " value="What was your dream job as a child? " />
                <Picker.Item label="What is your mother's middle name? " value="What is your mother's middle name? " />
                <Picker.Item label="Where did you vacation last year?" value="Where did you vacation last year?" />
                <Picker.Item label="What was your high school mascot?" value="What was your high school mascot?" />
              </Picker>
              <TextInput
                style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}
                placeholder="Answer"
                onChangeText={text => setAnswerTwo(text)}
                defaultValue={answerTwo}
              />
              <Picker
                selectedValue={questionThree}
                style={styles.questions}
                onValueChange={(itemValue, itemIndex) => {
                  const str = itemValue + '';
                  setQuestionThree(str);
                }}
              >
                <Picker.Item label="What was your childhood nickname?" value="What was your childhood nickname?" />
                <Picker.Item label="In what city did you meet your spouse/significant other?" value="In what city did you meet your spouse/significant other?" />
                <Picker.Item label="What is the name of your favorite childhood friend? " value="What is the name of your favorite childhood friend? " />
                <Picker.Item label="What street did you live on in third grade?" value="What street did you live on in third grade?" />
                <Picker.Item label="What school did you attend for sixth grade?" value="What school did you attend for sixth grade?" />
                <Picker.Item label="In what city or town was your first job?" value="In what city or town was your first job?" />
                <Picker.Item label="What was your dream job as a child? " value="What was your dream job as a child? " />
                <Picker.Item label="What is your mother's middle name? " value="What is your mother's middle name? " />
                <Picker.Item label="Where did you vacation last year?" value="Where did you vacation last year?" />
                <Picker.Item label="What was your high school mascot?" value="What was your high school mascot?" />
              </Picker>
              <TextInput
                style={{ fontSize: 18, margin: 10, borderWidth: 1, padding: 10 }}
                placeholder="Answer"
                onChangeText={text => setAnswerThree(text)}
                defaultValue={answerThree}
              />
              <Text
                style={{ fontSize: 18, padding: 10 }}
              >
                Select your interests:
              </Text>
              <CheckBox
                items={InterestValues}
                onChange={onInterestsChange}
              />

              <Button
                onPress={handleRegister}
                title={t('register')}
                color={Colors[colorScheme].tint}
              />
              <Text style={{ fontSize: 18, color: 'red', }}>{error}</Text>
              <Text
                style={{
                  color: 'blue',
                  padding: 10,
                  textAlign: 'right'
                }}
                onPress={() => nav.navigate('Login')}
              >
                {t('alreadyHaveAnAccountLogin')}
              </Text>
            </View>
          </>
        )
        }
      </View >
    </ScrollView>
  );
};

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  questions: {
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    margin: 10,
    paddingHorizontal: 10,
    width: '100%'
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  text: {
    borderWidth: 1,
    color: Colors['dark'].background,
    fontSize: 18,
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
  }
});

export default RegisterScreen;