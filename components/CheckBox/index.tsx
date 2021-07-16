import React, { Component, useState } from 'react';
import { View } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import { InterestValues } from '../../@types/index.d';

const fruits = InterestValues;

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