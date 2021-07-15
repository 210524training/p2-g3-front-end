/* eslint-disable react-native/no-unused-styles */
import * as React from 'react';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const RegisterScreen: React.FC<unknown> = (props) => {
  const user = useAppSelector<UserState>(selectUser);
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [questionOne, setQuestionOne] = useState<string>('');
  const [questionTwo, setQuestionTwo] = useState<string>('');
  const [questionThree, setQuestionThree] = useState<string>('');
  const [answerOne, setAnswerOne] = useState<string>('');
  const [answerTwo, setAnswerTwo] = useState<string>('');
  const [answerThree, setAnswerThree] = useState<string>('');

  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const handleLogin = async () => {
    await dispatch(loginAsync({ username, password }));
    nav.navigate('Home');
  };

  const handleRegister = async () => {
    // TODO: implement backend
    handleLogin();
    // const users = await getAllUsers();
    // let exists = false;

    // users.forEach(u => {
    //   if (u.username === username) {
    //     exists = true;
    //   }
    // });

    // if (!exists) {
    //   const { data: registered } = await grubdashClient.post<boolean>('/api/v1/users', {
    //     username, password, address, phoneNumber
    //   });

    //   if (registered) {
    //     handleLogin();
    //     return;
    //   } 
    // } else {
    //   Alert.alert('Username is already taken.');
    //   return;
    // }
    // Alert.alert('Failed to register.');
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
            <Button
              title="Logout"
              color="red"
              onPress={() => {
                dispatch(logout());

              }}
            ></Button>
          </>
        ) : (
          <>
            <Text style={styles.title}>Register</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={{ width: '100%', padding: 25, }}>
              <TextInput
                style={styles.text}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                defaultValue={email}
              />
              <TextInput
                style={styles.text}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                defaultValue={username}
              />
              <TextInput
                style={styles.text}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                defaultValue={password}
              />
              <TextInput
                style={styles.text}
                placeholder="Confirm Password"
                onChangeText={text => setConfirmPassword(text)}
                defaultValue={confirmPassword}
              />
              <TextInput
                style={styles.text}
                placeholder="Phone Number"
                onChangeText={text => setPhoneNumber(text)}
                defaultValue={phoneNumber}
              />
              <Text
                style={{ fontSize: 18, padding: 10 }}
              >
              Please Select 2 Security Questions: 
              </Text>
              <Picker
                selectedValue={questionOne}
                style={styles.questions}
                onValueChange={(itemValue, itemIndex) => setQuestionOne(itemValue)}
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
                onValueChange={(itemValue, itemIndex) => setQuestionTwo(itemValue)}
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
                onValueChange={(itemValue, itemIndex) => setQuestionThree(itemValue)}
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
              <Button
                onPress={handleRegister}
                title="Register"
                color="green"
              />
              <Text
                style={{
                  color: 'blue',
                  padding: 10,
                  textAlign: 'right'
                }}
                onPress={() => nav.navigate('Login')}
              >
              Already Have An Account?
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