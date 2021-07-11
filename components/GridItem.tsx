import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

type Props = {
  source: ImageSourcePropType,
  description: string,
}

const GridItem: React.FC<Props> = (props) => {
  return (
    <>
      <View style={styles.gridItem}>
        <Image source={props.source} style={styles.image1} />
        <Text style={styles.label}>{props.description} </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    alignItems: 'center',
    backgroundColor: '#a1becc',
    marginVertical: 3,
    paddingVertical: 10,
  },
  image1: {
    height: 200,
    resizeMode: 'contain',
    width: 200,
  },
  label: {
    color: '#262633',
    fontFamily: '',
    fontSize: 20,
    fontWeight: '600'
  }
});

export default GridItem; 