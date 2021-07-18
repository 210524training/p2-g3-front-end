import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import React from 'react';
import { GestureResponderEvent, Insets, Pressable, StyleProp, ViewStyle } from 'react-native';

type Props = {
  IconProvider?: Icon<any, any>,
  onPress?: (event: GestureResponderEvent) => void,
  props?: any,
  style?: StyleProp<ViewStyle>,
  hitSlop?: number | Insets | null,
};

const PressableIcon: React.FC<Props> = ({ IconProvider = MaterialIcons, props, onPress, style, hitSlop }): JSX.Element => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        style,
      ]}
      hitSlop={hitSlop}
    >
      <IconProvider {...props} />
    </Pressable>
  );
};

export default PressableIcon;