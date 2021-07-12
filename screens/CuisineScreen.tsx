import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, ImageSourcePropType, Platform, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GridItem from '../components/GridItem';
import { burger, mexican, chinese, italian, sushi } from '../assets';

type Props = {

}

export type Cuisine = [ImageSourcePropType, string];

const CuisineScreen: React.FC<Props> = () => {

  const nav = useNavigation();

  const cuisines: Cuisine[] = [
    [burger, 'American'],
    [italian, 'Italian'],
    [mexican, 'Mexican'],
    [chinese, 'Chinese'],
    [sushi, 'Asian']
  ];

  const cuisineJSX = (): JSX.Element[] => {
    return cuisines.map(cuisine => (
      <Pressable onPress={() => handlePress(cuisine)} key={cuisine[1]}>
        <GridItem source={cuisine[0]} description={cuisine[1]} />
      </Pressable>
    ));
  };

  const androidJSX = (): JSX.Element[] => {
    return cuisines.map(cuisine => (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => handlePress(cuisine)}
        key={cuisine[1]}
      >
        <GridItem source={cuisine[0]} description={cuisine[1]} />
      </TouchableNativeFeedback>
    ));
  };

  const handlePress = (cuisine: Cuisine) => {
    nav.navigate('RestaurantsScreen', {
      cuisine,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {
          Platform.OS === 'android' ?
            cuisineJSX() : cuisineJSX()
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    marginTop: 10,
    paddingHorizontal: 20,
  }
});

export default CuisineScreen;