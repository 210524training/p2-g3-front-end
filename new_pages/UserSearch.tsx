import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useEffect } from 'react';

type User = {
    username: string,
    image: any,
};

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 50,
        marginBottom: 10,
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

const UserSearchPage: React.FC<unknown> = (props) => {
    const [search, setSearch] = useState<string>('');
    const [userList, setUserList] = useState<User[]>();

    const handleSearch = (text?: string) => {
        if (text) {
            setSearch(text);
        }
        else {
            setSearch('');
        }
    }

    const exampleUsers: User[] = [];
    exampleUsers[0] = { username: 'Helen1957', image: require('../assets/images/taco.png') };
    exampleUsers[1] = { username: 'somebody8', image: require('../assets/images/taco.png') };

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
        <ScrollView style={styles.page}>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search Users"
                onChangeText={handleSearch}
                value={search} />
            <View>
                {userList ? (
                    userList.map((user) => (
                        <View style={styles.users} key={user.username}>
                            <Pressable>
                                <View style={styles.userContainer}>
                                    <Text style={styles.userText}>
                                        <Image style={styles.images} source={user.image} />
                                        {user.username}</Text>
                                </View>
                            </Pressable>
                        </View>
                    ))
                ) : (
                    <Text>No Users Found</Text>
                )}
            </View>
        </ScrollView>
    )
}

export default UserSearchPage;