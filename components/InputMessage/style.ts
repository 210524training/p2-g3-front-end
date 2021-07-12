import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createStyle = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors[colorScheme].tint,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  container: {
    alignItems: 'flex-end',
    backgroundColor: Colors[colorScheme].tabIconDefault,
    flexDirection: 'row',
    padding: 10
  }, 
  icon: {
    color: 'grey',
    marginHorizontal: 5,
  },
  inputField: {
    flex: 1,
    marginHorizontal: 10,
  },
  main: {
    alignItems: 'flex-end',
    backgroundColor: Colors[colorScheme].background,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    padding: 10
  },
});

export default createStyle;