/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { StyleSheet } from 'react-native';

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  contianer: {
    // flex: 1,
    flexDirection: 'row',
    // width: '100%',
  },
  image: {
    borderRadius: 50,
    height: 60,
    marginRight: 15,
    width: 60,
  },
});

export default createStyle;