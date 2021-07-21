import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { getForums } from '../remote/api/fetch.forums';
import { Forum, User, Interest } from '../@types/index.d';
import ForumListItem from '../components/ForumListItem';
import NewForum from '../components/NewForum';
import t from '../Localization';
import { getAllForums } from '../remote/api/forumAPI';

type Props = {
  currentUser? : User,
}

export default function TabOneScreen(props: Props): JSX.Element {
  const [forums, setForums] = useState<Forum[]>([]);
  const [forumPool, setForumPool] = useState<Forum[]>([]);
  const [search, setSearch] = useState<string>('');
  const [featuredForums, setFeaturedForums] = useState<Forum[]>([]);

  //const testInterests = ["Science"];

  const handleSearch = (text?: string) => {
    if (text) {
      setSearch(text);
    }
    else {
      setSearch('');
    }
  };

  useEffect(() => {
    getAllForums().then(setForums).catch(console.error);
    getAllForums().then(setForumPool).catch(console.error);
  }, []);

  useEffect(() => {
    if (search) {
      const filteredForums = forumPool.filter(forum => forum.title.includes(search));
      setForums(filteredForums);
    }
    else {
      const filteredForums = forumPool;
      setForums(filteredForums);
    }
  }, [search]);

  useEffect(() => {
    const interestForums = forumPool.filter(forum => forum.tags?.some(tag => props.currentUser?.interests.includes(tag as Interest)));
    //const interestForums = forumPool.filter(forum => forum.tags?.some(tag => testInterests.includes(tag as Interest)));
    setFeaturedForums(interestForums);
  }, [forumPool])

  return (
    <>
      <Searchbar
      placeholder = {t('search')}
      onChangeText={handleSearch}
      value={search} />
      <View style={styles.container}>
      <Text>Selected for you based on your interests:</Text>
        {
          featuredForums.length > 0
            ? (
              <FlatList
                style={{ width: '100%' }}
                data={featuredForums}
                renderItem={({ item }) => (
                  <ForumListItem forum={item} />
                )}
                keyExtractor={(item) => item.id + 'f'}
              />
            ) : (
              <Text>No Featured Forums</Text>
            )
        }
      </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
