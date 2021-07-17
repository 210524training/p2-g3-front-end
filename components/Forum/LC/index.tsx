import React from 'react';
import { View, Image, Pressable } from 'react-native';

import { User } from '../../../@types';
import defaultImageUri from '../../../constants/DefaultImageUri';
import useColorScheme from '../../../hooks/useColorScheme';
import createStyle from './styles';
export type LCProps = {
  user: User,
};

const LeftContainer: React.FC<LCProps> = ({ user }): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  const handleOnUserPicturePressed = () => {
    console.log('Navigate to user');
  };
  return (
    <View>
      <Pressable
        onPress={handleOnUserPicturePressed}
        style={({ pressed }) => [
          {opacity: pressed ? 0.5 : 1}
        ]}
      >
        <Image
          source={{
            uri: user.imageUri || defaultImageUri
          }}
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};

export default LeftContainer;