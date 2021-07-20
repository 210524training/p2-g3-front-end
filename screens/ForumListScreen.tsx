import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { getForums } from '../remote/api/fetch.forums';
import { Forum } from '../@types/index.d';
import ForumListItem from '../components/ForumListItem';
import NewForum from '../components/NewForum';

export default function TabOneScreen(): JSX.Element {
  const [forums, setForums] = useState<Forum[]>([]);

  useEffect(() => {
    getForums().then(setForums).catch(console.error);
  }, [forums]);

  return (
    <View style={styles.container}>
      {
        forums.length > 0
          ? (
            <FlatList
              style={{ width: '100%' }}
              data={forums}
              renderItem={({ item }) => (
                <ForumListItem forum={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text>No Forums</Text>
          )
      }
      <NewForum />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
