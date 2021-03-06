import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';
import { User } from '../@types';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import { useAppSelector } from '../hooks';
import t from '../Localization';

export type ContactsScreenProps = {

};

const ContactsScreen: React.FC<ContactsScreenProps> = (): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(user?.contacts || []);
  }, [users]);

  const acceptInvitation = (username: string) => {
    console.log('send invitation to', username);
  };

  const rejectInvitation = (username: string) => {
    console.log('reject', username);
  };

  const cancelRequest = (username: string) => {
    console.log('cancel req to', username);
  };

  return (
    <View style={styles.container}>
      {
        users.length > 0
          ? (
            <FlatList
              style={{ width: '100%' }}
              data={users}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                  {
                    item.username !== user?.username
                      ? (
                        <>
                          <ContactListItem user={item} />
                          {
                            user?.username.startsWith('*')
                              ? (
                                <>
                                  <Button title={t('accept')} onPress={() => {
                                    acceptInvitation(item.username);
                                  }} />
                                  <Button title={t('reject')} onPress={() => {
                                    rejectInvitation(item.username);
                                  }} />
                                </>
                              ) : (
                                user?.username.startsWith('~')
                                  ? (
                                    <>
                                      <Button title={t('cancel')} onPress={() => {
                                        cancelRequest(item.username);
                                      }} />
                                    </>
                                  ) : undefined
                              )
                          }
                        </>
                      ) : undefined
                  }
                </View>
              )}
              keyExtractor={(item) => item.username}
            />
          ) : (
            <Text>No Contacts</Text>
          )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ContactsScreen;