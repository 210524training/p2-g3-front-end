import React from 'react';
import { View, Image } from 'react-native';

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
  return (
    <View>
      <Image
        source={{
          uri: user.imageUri || defaultImageUri
        }}
        style={styles.image}
      />
    </View>
  );
};

export default LeftContainer;