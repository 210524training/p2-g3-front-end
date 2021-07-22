/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import { Forum, User } from '../@types/index.d';
import t from '../Localization';
import { generate as shorty } from 'shortid';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import { useAppSelector } from '../hooks';
import { addForum } from '../remote/api/forumAPI';
import { useNavigation } from '@react-navigation/native';

const AddForum: React.FC<unknown> = (): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);

  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const [titleText, setTitleText] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  const nav = useNavigation();

  const forumTemplate: Forum = {
    id: shorty(),
    title: '',
    tags: [],
    user: user as User,
    createdAt: new Date().toISOString(),
    content: '',
    likes: 0,
    numberOfComments: 0,
    comments: [],
  };
  const [newForum, setNewForum] = useState<Forum>(forumTemplate);

  const onTitleChange = (text: string) => {
    const nf = { ...newForum };
    nf.title = text;
    setTitleText(text);
    setNewForum(nf);
  };

  const onContentChange = (text: string) => {
    const nf = { ...newForum };
    nf.content = text;
    setContent(text);
    setNewForum(nf);
  };

  const onChangeNewTag = (text: string) => {
    setNewTag(text);
  };

  const removeTag = (tag: string) => {
    const nf = { ...newForum };
    const idx = nf.tags?.indexOf(tag);
    if (idx != undefined && idx >= 0) {
      nf.tags?.splice(idx, 1);
      setNewForum(nf);
    }
  };

  const handleAddtag = () => {
    const nf = { ...newForum };
    nf.tags?.push(newTag);
    setNewTag('');
    setNewForum(nf);
  };

  const onPressHandlerSendForum = () => {
    // TODO: send put to backend
    console.log(newForum);
    (async () => {
      const res = await addForum(newForum);
      console.log(res);
      nav.navigate('GeneralDiscussions');
    })();
  };

  return (
    <View
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={titleText}
          placeholder={t('title')}
          onChangeText={onTitleChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={content}
          placeholder={t('content')}
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
          onPress={handleAddtag} />
      </View>

      {/* tags */}
      {/* have input << add user */}
      {/* change user permissions or remove*/}

      <View style={styles.inputContainer}>
        <FlatList
          data={newForum.tags}
          renderItem={({ item, index }) => (
            <View style={styles.tagContainer}>
              <Text>{item}</Text>
              {
                <Button
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
          <Button
            title={t('add')}
            onPress={onPressHandlerSendForum}
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

export default AddForum;