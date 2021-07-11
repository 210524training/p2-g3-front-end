import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { ImageSourcePropType } from 'react-native';
import { useAppSelector } from '../hooks';
import { selectUser, UserState } from '../hooks/slices/user.slice';

import { storefront, scooter, iphone } from '../assets';

const HomeScreen: React.FC<unknown> = () => {
  const [address, setAddress] = useState('');
  const user = useAppSelector<UserState>(selectUser);
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.head}>
        <Text style={styles.title}>{user ? `Hello, ${user.username}!` : 'GrubDash'}</Text>
        <Text style={styles.subtitle}>Restaurants and more, delivered to your door</Text>
        <TextInput
          style={styles.search}
          placeholder="Your Address"
          onChangeText={address => setAddress(address)}
          defaultValue={address}
        />
      </View>

      <View style={styles.container}>
        {icon(scooter, 'Become a Dasher')}
        {icon(iphone, 'Try the App')}
        {icon(storefront, 'View Restaurants')}
      </View>

    </ScrollView>
  );
};

const icon = (img: ImageSourcePropType, txt: string) => {
  return (
    <View style={styles.imgContainer}>
      <Image
        source={img}
        style={styles.img}
      />
      <Text style={styles.imgText}>{txt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  head: {
    backgroundColor: 'red',
    padding: '5%',
    textAlign: 'center',
    width: '100%',
  },
  img: {
    height: 100,
    width: 100,
  },
  imgContainer: {
    paddingBottom: 20, paddingTop: 20
  },
  imgText: {
    textAlign: 'center',
  },
  search: {
    backgroundColor: 'white',
    borderRadius: 20,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    paddingLeft: 10,
    width: '100%',
  },
  subtitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 50,
    textAlign: 'center',
  },
});

export default HomeScreen;