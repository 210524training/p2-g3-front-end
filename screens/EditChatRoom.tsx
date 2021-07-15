/* eslint-disable react-native/no-unused-styles */
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import DDC from '../components/DropDown';
import Colors from '../constants/Colors';
import { useAppSelector } from '../hooks';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList } from '../types';
import {InterestValues} from '../@types/index.d';

type ChatRoomEditRouteProp = RouteProp<RootStackParamList, 'EditChatRoom'>;

export type ChatRoomEditProps = {
  route: ChatRoomEditRouteProp,
};

const EditChatRoom: React.FC<ChatRoomEditProps> = ({ route }): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const { chatRoom } = route.params;

  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  
  const [titleText, setTitleText] = React.useState(chatRoom.title);

  const onTitleSubmit = () => {
    //TODO: send title to db
    console.log(titleText);
  };


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <View style={styles.inputContainer}>
        <TextInput                   
          style={styles.input}
          value={titleText}
          placeholder={chatRoom.title}
          onChangeText={setTitleText}
        />
        <Button 
          title='edit title'
          onPress={onTitleSubmit}
        />

      </View>
      
      {/* tags */}
      {/* have input <<  */}
      {/* change user permissions or remove*/}
      {/* Modify btn */}
      {/* Delete chat room */}
      <View>
        <Text>Chat Settings</Text>
      </View>
      <View>
        <Text>Modify Tags</Text>
      </View>
      <View>
        {/* <Text>{{displayGroupUsers()}}</Text> */}
        
      </View>
      <DDC
        render={(
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color={Colors[colorScheme].tint}
          />
        )}
        items={[
          { key: 'item-1', render: (<Text>Item 1</Text>), onClick: () => { alert('item 1 clicked'); } },
          { key: 'item-2', render: (<Text>Item 2</Text>), onClick: () => { alert('item 2 clicked'); } },
          { key: 'item-3', render: (<Text>Item 3</Text>), onClick: () => { alert('item 3 clicked'); } },
          { key: 'item-4', render: (<Text>Item 4</Text>), onClick: () => { alert('item 4 clicked'); } },
        ]}
      />
    </ScrollView>
  );
};

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    width: '100%',
  },
  containerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    flex: 1,
    height: 40,
    margin: 12,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default EditChatRoom;