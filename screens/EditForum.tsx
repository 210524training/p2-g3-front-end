/* eslint-disable react-native/no-unused-styles */
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import DDC from '../components/DropDown';
import Colors from '../constants/Colors';
import { useAppSelector } from '../hooks';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList } from '../types';
import {Forum, ChatRoomUser, InterestValues, User} from '../@types/index.d';
import t from '../Localization';
import {generate as shorty} from 'shortid';
import Users from '../remote/data/Users';
import { strikeContent } from 'aws-amplify';
type ForumEditRouteProp = RouteProp<RootStackParamList, 'EditForum'>;

export type ForumEditProps = {
  route: ForumEditRouteProp,
};

const EditForum: React.FC<ForumEditProps> = ({ route }): JSX.Element => {
  //const user = useAppSelector<UserState>(selectUser);
  const user: User = {
    email: 'a@b',
    username: 'haha',
    password: 'pass',
    interests: [],
    isSuperAdmin: true,
    securityQuestionOne: {answer:'',question:''},
    securityQuestionTwo: {answer:'',question:''},
    securityQuestionThree: {answer:'',question:''},
  };

  const { forum } = route.params;

  const [newForum, setNewForum] = useState<Forum>({...forum});

  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const nav = useNavigation();
  
  const [titleText, setTitleText] = useState<string>(forum.title);
  const [content, setContent] = useState<string>(forum.content);
  const [newTag, setNewTag] = useState<string>('');

  // if (!user) {
  //   nav.navigate('LoginScreen');
  //   return <></>;
  // }

  const onTitleChange = (text: string) => {
    const nf = {...newForum};
    nf.title = text;
    setTitleText(text);
    setNewForum(nf);
  };

  const onContentChange = (text: string) => {
      const nf = {...newForum};
      nf.content = text;
      setContent(text);
      setNewForum(nf);
  };

  const onChangeNewTag = (text: string) => {
      setNewTag(text);
  }

  const removeTag = (tag: string) => {
      const nf = {...newForum};
      const idx = nf.tags?.indexOf(tag);
      if (idx != undefined && idx >=0) {
        nf.tags?.splice(idx, 1);
        setNewForum(nf);
      }
  }

  const handleAddtag = () => {
      const nf = {...newForum};
      nf.tags?.push(newTag);
      setNewTag('');
      setNewForum(nf);
  }

  const canDeleteForum = (u: User): boolean => {
    let elevated = false;
      if (u.username === forum.user.username || u.isSuperAdmin) {
        elevated = true;
      }
    return elevated;
  };

  const canModifyForum = (u: User): boolean => {
    let elevated = false;
      if (u.username === forum.user.username || u.isSuperAdmin) {
        elevated = true;
      }
    return elevated;
  };

  const onPressHandlerSendForum = () => {
    // TODO: send put to backend
    console.log(newForum);
  };

  const onPressHandlerDeleteForum = () => {
    console.log('delete forum');
  };

  return (
    <View
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput                   
          style={styles.input}
          value={titleText}
          placeholder={forum.title}
          onChangeText={onTitleChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput                   
          style={styles.input}
          value={content}
          placeholder={forum.content}
          onChangeText={onContentChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput                   
          style={styles.input}
          value={newTag}
          placeholder={t('tag')}
          onChangeText={onChangeNewTag}
        />
        <Button
        title={t('add')}
        onPress={handleAddtag}/>
      </View>
      
      {/* tags */}
      {/* have input << add user */}
      {/* change user permissions or remove*/}

      <View style={styles.inputContainer}>
        <FlatList
          data={ forum.tags }
          renderItem={({ item, index }) => (
            <View style={styles.tagContainer}>
              <Text>{item}</Text>
              {
                canModifyForum(user) && <Button
                  title={t('remove')}
                  onPress={() => removeTag(item)}
                /> 
              }
            </View>
          )}
          keyExtractor={item => item}
        />

      </View>

      <View>
        {
          canModifyForum(user) && <Button 
            title={t('edit')}
            onPress={onPressHandlerSendForum}
          />
        }
        {
          canDeleteForum(user) && <Button 
            title={t('deleteForum')}
            onPress={onPressHandlerDeleteForum}
          />
        }
        
      </View>
      
    </View>
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
  tagContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});

export default EditForum;