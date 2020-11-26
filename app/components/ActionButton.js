import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';

import Color from '../themes/color';
class ActionButton extends Component {
  backgroundColor = () => {
    const {isDisabled, customBackgroundColor} = this.props;

    if (isDisabled)
      return {backgroundColor: 'gray'};
    else if (customBackgroundColor != undefined)
      return {backgroundColor: customBackgroundColor};

    return {backgroundColor: Color.primaryColor};
  }

  render() {
    const {onPress, label, isDisabled, customButtonStyle} = this.props;

    return (
      <Button
        onPress={() => onPress()}
        mode="contained"
        uppercase={true}
        contentStyle={[styles.contentStyle]}
        labelStyle={styles.labelStyle}
        style={[
          styles.buttonStyle,
          customButtonStyle,
          this.backgroundColor()
        ]}
        labelStyle={{color: '#fff'}}
        disabled={isDisabled}
      >
        {label}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  contentStyle: {
    height: 50,
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
    borderRadius: 4,
    elevation: 0,
  },
  labelStyle: {
    fontSize: 18,
    color: '#fff'
  }
});

export default ActionButton;
