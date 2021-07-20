/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/sort-styles */
import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useEffect } from 'react';
import { User } from '../@types';
import ContactListItem from '../components/ContactListItem';
import users from '../remote/data/Users';
import t from '../Localization';
import { getAllUsers } from '../remote/api/fetch.users';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import { useAppSelector } from '../hooks';

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
    if (user?.username !== u.username) return false;
    return !(user?.contacts?.map(contact => contact.username)?.includes(u.username));
  };

  useEffect(() => {
    (async () => {
      const users = (await getAllUsers()).filter(u => exclude(u));
      setExampleUsers([...users]);
      setUserList([...users]);
    })();
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
                <Button title={t('add')} onPress={() => {}}/>
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