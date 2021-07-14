/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

export type DropDownItem = {
  render: JSX.Element,
  onClick: () => void,
  key: string,
};

export type DropDownProps = {
  show: boolean,
  position: any,
  hide: (value?: string) => void,
  items: DropDownItem[],
};

export default class DropDown extends React.Component<DropDownProps, unknown> {

  render(): JSX.Element | null {
    if (this.props.show) {
      const { y: top, x: left } = this.props.position;
      const width = 100;
      return (
        <TouchableWithoutFeedback onPress={() => this.props.hide('background pressed')}>
          <View style={styles.container}>
            <View style={[styles.menu, { top, left: left - width / 2, width }]}>
              {this.props.items && this.props.items.map((item) => (
                <TouchableOpacity
                  style={{ width, alignItems: 'center', paddingTop: 5 }}
                  onPress={() => {
                    this.props.hide();
                    item.onClick();
                  }}
                  key={item.key}
                >
                  {item.render}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  menu: {
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 11,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  }
});
