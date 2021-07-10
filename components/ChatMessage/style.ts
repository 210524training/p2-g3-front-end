import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const padding = 10;
const borderRadius = 5;
const margin = 50;

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors[colorScheme].tabIconDefault,
  },
  message: {
    backgroundColor: Colors[colorScheme].background,
    marginRight: margin,
    borderRadius,
    padding,
  },
  outMessage: {
    backgroundColor: Colors[colorScheme].tint,
    marginLeft: margin,
    borderRadius,
    padding,
  },
  name: {
    color: Colors[colorScheme].tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageContent: {
    
  },
  timestamp: {
    marginTop: 5,
    alignSelf: 'flex-end',
    fontStyle: 'italic',
  },
});

export default createStyle;