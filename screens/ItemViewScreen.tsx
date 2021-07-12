import React from 'react';
import { Text, View } from '../components/Themed';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, ScrollView, Button } from 'react-native';
import { RootStackParamList } from '../types';

type ItemViewScreenRouteProp = RouteProp<
  RootStackParamList,
  'ItemView'
>;

type Props = {
  route: ItemViewScreenRouteProp,
}

const ItemViewScreen: React.FC<Props> = ({route}) => {
  const nav = useNavigation();
  const r = route.params.restaurant;
  return (
    <ScrollView contentContainerStyle={{}}>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text style={[styles.text, { textAlign: 'left'} ]}>
            <Button 
              title="Back"
              onPress={() => nav.goBack()}
            ></Button>
          </Text>
        </View>
        <Text style={styles.text}>
          {r.name}
        </Text>
        <View style={styles.rightContainer}>
          <View style={styles.rightIcon}/>
        </View>
      </View>
    </ScrollView>
  );
};

//https://stackoverflow.com/a/36010239
const styles = StyleSheet.create({
  leftContainer: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  navBar: {
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  rightContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightIcon: {
    backgroundColor: 'red',
    height: 10,
    resizeMode: 'contain',
    width: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default ItemViewScreen;