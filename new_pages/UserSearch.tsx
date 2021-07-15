import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { Pressable, View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useEffect } from 'react';
import { User } from '../@types'
import ContactListItem from '../components/ContactListItem';
import users from '../remote/data/Users';

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
})

const UserSearchPage: React.FC<unknown> = () => {
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
    }

    useEffect(() => {
        setExampleUsers(users);
        setUserList(users);
    }, []);

    useEffect(() => {
        if (search) {
            let filteredUsers = exampleUsers.filter(user => user.username.includes(search));
            setUserList(filteredUsers);
        }
        else {
            let filteredUsers = exampleUsers;
            setUserList(filteredUsers);
        }
    }, [search]);

    return (
        <>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search Users"
                onChangeText={handleSearch}
                value={search} />
            <View style={styles.newContainer}>
                {userList ? (
                    <FlatList
                        style={{ width: '100%' }}
                        data={userList}
                        renderItem={({ item }) => (
                            <ContactListItem user={item} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text>No Users Found</Text>
                )}
            </View>
        </>
    )
}

export default UserSearchPage;