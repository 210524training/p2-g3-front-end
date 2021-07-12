import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const padding = 10;
const borderRadius = 5;
const margin = 50;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    backgroundColor: Colors[colorScheme].tabIconDefault,
    padding: 10,
  },
  message: {
    backgroundColor: Colors[colorScheme].background,
    borderRadius,
    marginRight: margin,
    padding,
  },
  messageContent: {
    
  },
  name: {
    color: Colors[colorScheme].tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  outMessage: {
    backgroundColor: Colors[colorScheme].tint,
    borderRadius,
    marginLeft: margin,
    padding,
  },
  timestamp: {
    alignSelf: 'flex-end',
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default createStyle;