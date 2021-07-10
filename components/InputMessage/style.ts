import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    backgroundColor: Colors[colorScheme].tabIconDefault,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-end'
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors[colorScheme].background,
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'flex-end'
  }, 
  inputField: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
    color: 'grey',
  },
  buttonContainer: {
    backgroundColor: Colors[colorScheme].tint,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default createStyle;