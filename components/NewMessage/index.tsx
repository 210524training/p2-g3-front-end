import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { View, Text } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import createStyle from './style';

export type NewMessageProsp = {

};

const NewMessage: React.FC<NewMessageProsp> = ({ }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const nav = useNavigation();

  const handleNewMessage = (event: GestureResponderEvent) => {
    nav.navigate('Contacts');
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleNewMessage}
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 }
        ]}
        hitSlop={10}
      >
        <MaterialCommunityIcons
          name='message-reply-text'
          size={28}
          color='white'
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default NewMessage;