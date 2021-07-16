/* eslint-disable react-native/sort-styles */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  contianer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
  },
});

export default createStyle;