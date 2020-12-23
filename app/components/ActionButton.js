import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';

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
    const {onPress, label, isDisabled, customButtonStyle, customLabelStyle} = this.props;

    return (
      <Button
        onPress={() => onPress()}
        mode="contained"
        uppercase={true}
        contentStyle={[styles.contentStyle]}
        labelStyle={[styles.labelStyle, customLabelStyle]}
        style={[
          styles.buttonStyle,
          customButtonStyle,
          this.backgroundColor()
        ]}
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
    borderRadius: 8,
    elevation: 0,
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: FontFamily.title
  }
});

export default ActionButton;
