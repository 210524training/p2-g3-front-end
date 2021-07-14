import { StyleSheet } from 'react-native';

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
  }
});

export default createStyle;