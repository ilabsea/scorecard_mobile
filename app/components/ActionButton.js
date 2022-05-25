import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import Color from '../themes/color';
import { buttonBorderRadius } from '../constants/border_radius_constant';
import { bottomButtonFontSize } from '../utils/font_size_util';

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
    borderRadius: buttonBorderRadius,
    elevation: 0,
    justifyContent: 'center',
  },
  labelStyle: {
    fontFamily: FontFamily.body,
    fontSize: bottomButtonFontSize(),
    color: Color.whiteColor,
  }
});

export default ActionButton;
