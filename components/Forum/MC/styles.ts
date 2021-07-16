/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',

  },
  headerIcons: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  content: {

  },
  image: {

  },
  footer: {

  },
  text: {
    marginHorizontal: 5,
  },
  title: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 20,
  },
  username: {
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  timestamp: {
    fontStyle: 'italic',
    color: Colors[colorScheme].tabIconDefault,
  },
  tags: {

  },
});

export default createStyle;