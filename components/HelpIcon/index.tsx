import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
import { View, Text } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import createStyle from '../NewMessage/style';

const EditIcon: React.FC<unknown> = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const nav = useNavigation();

  const handleEditIcon = () => {
    nav.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleEditIcon}
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 }
        ]}
        hitSlop={10}
      >
        <MaterialCommunityIcons
          name='pencil'
          size={28}
          color='white'
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default EditIcon;