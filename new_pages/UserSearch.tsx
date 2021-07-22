/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/sort-styles */
import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useEffect } from 'react';
import { FriendRequest, User } from '../@types/index.d';
import ContactListItem from '../components/ContactListItem';
import t from '../Localization';
import { getAllUsers } from '../remote/api/fetch.users';
import { loginCache, selectUser, UserState } from '../hooks/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Auth } from 'aws-amplify';
import { updateUserData } from '../remote/api/userDataApi';

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 50,
    marginBottom: 10,
  },

  newContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  users: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 5,
  },

  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#F9F9F9',
    borderColor: '#d3d3d3',
    borderRadius: 20,
    paddingLeft: 75,
    paddingRight: 75,
  },

  page: {
    backgroundColor: '#cdf0ea',
  },

  images: {
    height: 30,
    width: 30,
  },

  userText: {

  }
});

const tooLong = (arg: any): boolean => {
  return JSON.stringify(arg).length > 2048;
};

const UserSearchPage: React.FC<unknown> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector<UserState>(selectUser);
  const [search, setSearch] = useState<string>('');
  const [exampleUsers, setExampleUsers] = useState<User[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const handleSearch = (text?: string) => {
    if (text) {
      setSearch(text);
    }
    else {
      setSearch('');
    }
  };

  const exclude = (u: User): boolean => {
    if (user?.username !== u.username) return true;
    return !!(user?.contacts?.map(contact => contact.username)?.includes(u.username));
  };

  useEffect(() => {
    try {
      (async () => {
        const users = (await getAllUsers()).filter(u => exclude(u));
        setExampleUsers([...users]);
        setUserList([...users]);
        console.log(users);
      })();
    } catch (err) {
      console.log('user search 2', err);
      setExampleUsers([]);
      setUserList([]);
    }
  }, [user]);

  useEffect(() => {
    const ls = search.toLowerCase();
    if (search) {
      const filteredUsers = exampleUsers.filter(user => user.username.toLowerCase().includes(ls));
      setUserList(filteredUsers.filter(u => exclude(u)));
    }
    else {
      const filteredUsers = exampleUsers;
      setUserList(filteredUsers.filter(u => exclude(u)));
    }
  }, [search]);

  const addUserToContacts = (username: string) => {
    // console.log('Add user', username);
    try {
      (async () => {
        if (user && userList) {

          const idx = userList.findIndex(cu => cu.username === username);
          if (idx >= 0) {
            const add = userList[idx];
            if (add.username !== user.username) {
              console.log(user.username, 'wants to add', add.username);
              if (!user.contacts) {
                user.contacts = [];
              }

              if (!add.contacts) {
                add.contacts = [];
              }

              const oldUserContacts = user.contacts.map(u => u.username);
              const oldAddUserContacs = add.contacts.map(u => u.username);
              console.log('before', oldUserContacts, oldAddUserContacs);
              let alreadyFriends = false;
              for (const c of oldUserContacts) {
                if (c === add.username){
                  alreadyFriends = true;
                  break;
                }
              }

              for (const c of oldAddUserContacs) {
                if (alreadyFriends || c === user.username){
                  alreadyFriends = true;
                  break;
                }
              }

              if (alreadyFriends) {
                Alert.alert('You are already friends with this user.');
                return;
              }

              const newUserContacts = [FriendRequest.PENDING + add.username, ...oldUserContacts];
              const newAddUserContacs = [FriendRequest.AWAITING + user.username, ...oldAddUserContacs];

              console.log('after', [FriendRequest.PENDING + add.username, ...oldUserContacts], [FriendRequest.AWAITING + user.username, ...oldAddUserContacs]);

              (async () => {
                const a = await updateUserData(user.username, newUserContacts, user.chatRooms);

                if (a) {
                  const b = await updateUserData(add.username, newAddUserContacs, add.chatRooms);

                  if (!b) {
                    await updateUserData(user.username, oldUserContacts, user.chatRooms);
                    await updateUserData(add.username, oldAddUserContacs, add.chatRooms);

                    Alert.alert('Falied to update contacts');
                  } else {
                    Alert.alert('Your friend request has been sent!');
                    await dispatch(loginCache({ username: user.username, password: '' }));
                    return;
                  }
                } else {
                  await updateUserData(user.username, oldUserContacts);
                  Alert.alert('Failed to send the friend request.');
                }

              })();

            } else {
              Alert.alert('You cannot add yourself');
            }
          }

        }
      })();
    } catch (err) {
      console.error('user search', err);
    }
  };

  return (
    <>
      <Searchbar
        style={styles.searchBar}
        placeholder={t('searchForUser')}
        onChangeText={handleSearch}
        value={search}
      />
      <View style={styles.newContainer}>
        {userList ? (
          <FlatList
            style={{ width: '100%' }}
            data={userList}
            renderItem={({ item }) => (
              <>
                <ContactListItem user={item} />
                <Button title={t('add')} onPress={() => {
                  addUserToContacts(item.username);
                }} />
              </>
            )}
            keyExtractor={(item) => item.username}
          />
        ) : (
          <Text>{t('noUsersFound')}</Text>
        )}
      </View>
    </>
  );
};

export default UserSearchPage;