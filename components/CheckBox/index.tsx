import React, { useState } from 'react';
import { View } from 'react-native';
import { InterestValues } from '../../@types/index.d';
import SelectMultiple from 'react-native-select-multiple';

export type CheckBoxItem = {
  label: string,
  value: string,
};

export type CheckBoxProps = {
  items?: string[],
  onChange?: (items: CheckBoxItem[]) => void,
};

const CheckBox: React.FC<CheckBoxProps> = ({ items = InterestValues, onChange = (items) => {console.log(items);} }) => {
  const [selected, setSelected] = useState<CheckBoxItem[]>([]);
  const onSelectionsChange = (s:  CheckBoxItem[]): void => {
    setSelected([...s]);
    onChange([...s]);
  };

  return (
    <View>
      <SelectMultiple
        items={items}
        selectedItems={selected}
        onSelectionsChange={onSelectionsChange} />
    </View>
  );

};

export default CheckBox;