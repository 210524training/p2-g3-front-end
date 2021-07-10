import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { User } from '../types';
import NewMessage from '../components/NewMessage';
import ContactListItem from '../components/ContactListItem';
import { getFriends } from '../remote/api/fetch.users';

export type ContactsScreenProps = {

};

const ContactsScreen: React.FC<ContactsScreenProps> = ({ }): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const user: {id: string} = {id: 'u1'};
  useEffect(() => {
    getFriends(user.id).then(setUsers).catch(console.error)
  }, [users]);

  return (
    <View style={styles.container}>
      {
        users.length > 0
          ? (
            <FlatList
              style={{ width: '100%' }}
              data={users}
              renderItem={({ item }) => (
                <ContactListItem user={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text>No Friends :(</Text>
          )
      }
      {/* <NewMessage /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ContactsScreen;