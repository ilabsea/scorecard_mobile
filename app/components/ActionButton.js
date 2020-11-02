import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import {LocalizationContext} from '../components/Translations';

import Color from '../themes/color';

class ActionButton extends Component {
  static contextType = LocalizationContext;

  backgroundColor = () => {
    const {isDisabled, customBackgroundColor} = this.props;

    if (isDisabled)
      return {backgroundColor: 'gray'};
    else if (customBackgroundColor != undefined)
      return {backgroundColor: customBackgroundColor};

    return {backgroundColor: Color.primaryColor};
  }

  render() {
    const {translations} = this.context;
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
          this.backgroundColor(),
        ]}
        disabled={isDisabled}
      >
        {translations[label]}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  contentStyle: {
    height: 55,
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
    borderRadius: 8,
    elevation: 0,
  },
  labelStyle: {
    fontSize: 18,
  }
});

export default ActionButton;