/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/sort-styles */
import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useEffect } from 'react';
import { User } from '../@types';
import ContactListItem from '../components/ContactListItem';
import t from '../Localization';
import { getAllUsers, updateContacts } from '../remote/api/fetch.users';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import { useAppSelector } from '../hooks';
import { Auth } from 'aws-amplify';
import { cognito } from '../remote/api/client';

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

              const oldUserContacts = user.contacts.filter(u => u);
              const oldAddUserContacs = add.contacts.filter(u => u);

              console.log(user.contacts, add.contacts);
              if (tooLong([add.username, ...oldUserContacts])) {
                Alert.alert('You have too many friends.');
                return;
              }

              if (tooLong([user.username, ...oldAddUserContacs])) {
                Alert.alert(`${add.username} doesn't have space for more friends.`);
                return;
              }

              (async () => {
                const cu = await Auth.currentAuthenticatedUser();
                const a = await updateContacts(cu, [add.username, ...oldUserContacts]);
                
                if (a) {
                  const cogusers = (await (await cognito()).get('/users')).data.Users;
                  const idxB = cogusers.findIndex(cu => cu.Username === add.username);
                  const b = await updateContacts(add.username, [user.username, ...oldAddUserContacs]);

                  if (!b) {
                    await updateContacts(user.username, oldUserContacts);
                    await updateContacts(add.username, oldAddUserContacs);
                    Alert.alert('Falied to update contacts');
                  } else {
                    Alert.alert('Your friend request has been sent!');
                    return;
                  }
                } else {
                  await updateContacts(user.username, oldUserContacts);
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