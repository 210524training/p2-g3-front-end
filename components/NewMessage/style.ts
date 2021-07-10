import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    backgroundColor: Colors[colorScheme].tint,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  icon: {
    color: Colors[colorScheme].background
  },
});

export default createStyle;