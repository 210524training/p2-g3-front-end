/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { StyleSheet } from 'react-native';

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  contianer: {

  },
  image: {
    borderRadius: 50,
    height: 60,
    marginRight: 15,
    width: 60,
  },
  tag: {
    borderRadius: 5,
    borderWidth: 0.5,
    fontWeight: 'bold',
    margin: 2,
    padding: 2,
  }
});

export default createStyle;