/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  Pressable
} from 'react-native';
import DropDown, { DropDownItem } from './DropDown';

type DDCProps = {
  render: JSX.Element,
  items: DropDownItem[],
};

type DDCState = {
  show: boolean,
  position: any
};

export default class DDC extends React.Component<DDCProps, DDCState> {
  button: View | null = null;

  state = {
    show: false,
    position: {}
  }

  showDropDown = (event: GestureResponderEvent): void => {
    const { locationX, locationY } = event.nativeEvent;
    if (this.button) {
      this.button.measure((x, y, width, height, pageX, pageY) => {
        console.log(x, y, width, height, pageX, pageY);
        this.setState({
          show: true, 
          position: {
            x: locationX,
            y: locationY,
          }
        });
      });
    }
  }

  // hide the dropdown
  hideDropDown = (): void => {
    this.setState({ show: false, position: {} });
  }

  render(): JSX.Element {
    return (
      <View style={styles.container} onTouchEnd={this.hideDropDown}>
        <View style={styles.btn} >

          <Pressable
            ref={ref => {
              this.button = ref;
            }}
            onPress={this.showDropDown}
            hitSlop={400}
          >
            {this.props.render}
          </Pressable>
        </View>
        <DropDown
          show={this.state.show}
          position={this.state.position}
          hide={this.hideDropDown}
          items={this.props.items}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    height: 100,
    justifyContent: 'center',
    width: 300,
    // marginLeft: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    justifyContent: 'center',
  }
});

