/* eslint-disable react-native/no-unused-styles */
import { AntDesign } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import DDC from '../components/DropDown';
import Colors from '../constants/Colors';
import { useAppSelector } from '../hooks';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList } from '../types';
import {ChatRoom, ChatRoomUser, User} from '../@types/index.d';
import t from '../Localization';
import {generate as shorty} from 'shortid';
type ChatRoomEditRouteProp = RouteProp<RootStackParamList, 'EditChatRoom'>;

export type ChatRoomEditProps = {
  route: ChatRoomEditRouteProp,
};

const EditChatRoom: React.FC<ChatRoomEditProps> = ({ route }): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const { chatRoom } = route.params;

  const [newChatRoom, setNewChatRoom] = useState<ChatRoom>({...chatRoom});

  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);
  const nav = useNavigation();
  
  const [titleText, setTitleText] = useState<string>(chatRoom.title);
  const [searchForUserText, setSearchForUserText] = useState<string>('');

  // if (!user) {
  //   nav.navigate('LoginScreen');
  //   return <></>;
  // }

  const onTitleChange = (text: string) => {
    const ncr = {...newChatRoom};
    ncr.title = text;
    setTitleText(text);
    setNewChatRoom(ncr);
  };

  const onUserSearch = () => {
    console.log('search for', searchForUserText);
  };

  const removeUserById = (user: ChatRoomUser) => {
    const ncr = {...newChatRoom};
    const idx = ncr.users.indexOf(user);
    if (idx >= 0) {
      ncr.users.splice(idx, 1);
      setNewChatRoom(ncr);
    }
  };

  const canDeleteRoom = (u: User): boolean => {
    let elevated = false;
    for (let i = 0; i < chatRoom.users.length; i++) {
      if (chatRoom.users[i].user.id === u?.id) {
        elevated = chatRoom.users[i].isAdmin;
        break;
      }
    }
    return elevated;
  };

  const canModifyRoom = (u: User): boolean => {
    let elevated = false;
    for (let i = 0; i < chatRoom.users.length; i++) {
      if (chatRoom.users[i].user.id === u?.id) {
        elevated = chatRoom.users[i].isAdmin || chatRoom.users[i].isModerator;
        break;
      }
    }
    return elevated;
  };

  const onPressHandlerSendChatRoom = () => {
    // TODO: send put to backend
    console.log(newChatRoom);
  };

  const onPressHandlerDeleteChatRoom = () => {
    console.log('delete chatroom');
  };

  return (
    <View
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput                   
          style={styles.input}
          value={titleText}
          placeholder={chatRoom.title}
          onChangeText={onTitleChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput                   
          style={styles.input}
          value={searchForUserText}
          placeholder={t('searchForUser')}
          onChangeText={setSearchForUserText}
        />
        <Button 
          color={Colors[colorScheme].tint}
          title={t('search')}
          onPress={onUserSearch}
        />
      </View>
      
      {/* tags */}
      {/* have input << add user */}
      {/* change user permissions or remove*/}

      <View style={styles.inputContainer}>
        <FlatList
          data={ chatRoom.users }
          renderItem={({ item, index }) => (
            <View style={styles.userContainer}>
              <Text>{item.user.username}</Text>
              {
                canModifyRoom(user) 
                  ? <DDC
                    render={(
                      <Pressable style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]} >
                        <Text
                          style={{color: Colors[colorScheme].text}}
                        >
                          {item.isAdmin  ? t('administrator') : ((item.isModerator) ? t('moderator') : t('none') )} <AntDesign name="caretdown" color={Colors[colorScheme].text} />
                        </Text>
                      </Pressable>
                    )}
                    items={[
                      { 
                        key: `none-${shorty()}`, render: (<Text>{t('none')}</Text>), onClick: () => { 
                          const ncr = {...newChatRoom};
                          ncr.users[index].isAdmin = false;
                          ncr.users[index].isModerator = false;
                          setNewChatRoom(ncr);
                        } 
                      },
                      { 
                        key: `moderator-${shorty()}`, render: (<Text>{t('moderator')}</Text>), onClick: () => { 
                          const ncr = {...newChatRoom};
                          ncr.users[index].isAdmin = false;
                          ncr.users[index].isModerator = true;
                          setNewChatRoom(ncr);
                        }
                      },
                      { 
                        key: `admin-${shorty()}`, render: (<Text>{t('administrator')}</Text>), onClick: () => { 
                          const ncr = {...newChatRoom};
                          ncr.users[index].isAdmin = true;
                          ncr.users[index].isModerator = false;
                          setNewChatRoom(ncr);
                        }
                      },
                    ]}
                  />
                  : <Text>{item.isAdmin  ? t('administrator') : ((item.isModerator) ? t('moderator') : t('none') )}</Text>
              }

              {
                canModifyRoom(user) && <Button
                  title={t('remove')}
                  onPress={() => removeUserById(item)}
                /> 
              }

            </View>
          )}
          keyExtractor={item => item.user.id}
        />

      </View>

      <View>
        {
          canModifyRoom(user) && <Button 
            title={t('edit')}
            onPress={onPressHandlerSendChatRoom}
          />
        }
        {
          canDeleteRoom(user) && <Button 
            title={t('deleteChatRoom')}
            onPress={onPressHandlerDeleteChatRoom}
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
  userContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});

export default EditChatRoom;