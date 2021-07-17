import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (colorScheme: 'light' | 'dark' = 'light') => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  containerMetadata: {
    justifyContent: 'space-around',
  },
  image: {
    borderRadius: 50,
    height: 60,
    marginRight: 15,
    width: 60,
  },
  imageSquare: {
    height: 60,
    marginRight: 15,
    width: 60,
  },
  leftSide: {
    flex: 1,
    flexDirection: 'row',
    // width: 50,
  },
  subtitle: {
    color: 'grey',
    fontSize: 16,
    fontStyle: 'italic',
    width: '100%',
  },
  timestamp: {
    color: 'grey',
    fontSize: 14,
  },
  title: {
    color: Colors[colorScheme].text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
