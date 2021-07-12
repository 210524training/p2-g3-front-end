import React from 'react';
import { Text } from 'react-native';
import { generate as shortid } from 'shortid';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { injectStyling } from './utils';


export type DDLTextProps = {
  text: string,
  color?: string,
  linkColor?: string,
};

const DDLText: React.FC<DDLTextProps> = ({ text, color, linkColor }): JSX.Element => {
  const colorScheme = useColorScheme();
  return (
    <Text key={shortid()}>
      {
        injectStyling(
          text, 
          color || Colors[colorScheme].background || 'black', 
          'blue'
        )
      }
    </Text>
  );
};

export default DDLText;