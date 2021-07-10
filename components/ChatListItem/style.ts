import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = (colorScheme: "light" | "dark" = 'light') => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  leftSide: {
    flex: 1,
    flexDirection: 'row',
    // width: 50,
  },
  containerMetadata: {
    justifyContent: 'space-around',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors[colorScheme].text,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'grey',
    width: '100%',
  },
  timestamp: {
    fontSize: 14,
    color: 'grey',
  },
});

export default styles;
