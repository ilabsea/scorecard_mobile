import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {LocalizationContext} from '../components/Translations';

import Color from '../themes/color';

class ActionButton extends Component {
  static contextType = LocalizationContext;

  disableBackground = () => {
    if (this.props.isDisabled)
      return {backgroundColor: 'gray'};
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[styles.buttonContainer, this.props.containerStyle, this.disableBackground()]}
        disabled={this.props.isDisabled}
      >
        <Text style={[styles.buttonLabel, this.props.labelStyle]}>{translations[this.props.title]}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Color.primaryColor,
    width: '80%',
    padding: 16,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  }
});

export default ActionButton;