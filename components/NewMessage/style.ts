import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors[colorScheme].tint,
    borderRadius: 25,
    bottom: 20,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 50,
  },
  icon: {
    color: Colors[colorScheme].background
  },
});

export default createStyle;