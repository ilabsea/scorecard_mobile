import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Color from '../themes/color';
import { getIntegerOf } from '../utils/math';
import TextFieldInput from './TextFieldInput';
import { LocalizationContext } from './Translations';

class NumericInput extends Component {
  static contextType = LocalizationContext;

  getBorderColor = () => {
    return !!this.getErrorMessage() ? 'red' : '';
  };

  onFocus = () => {
    if (getIntegerOf(this.props.value) < 1) {
      this.props.onChangeText('');
    }

    !!this.props.onFocus && this.props.onFocus();
  }

  getErrorMessage() {
    const { translations } = this.context;

    if (this.props.isRequired) {
      return !this.props.value ? translations.cannotBeBlank : '';
    }

    return this.props.errorMessage;
  }

  render() {
    return (
      <View>
        <TextInput
          { ...this.props }
          mode="outlined"
          style={{backgroundColor: 'white', width: '100%'}}
          keyboardType="number-pad"
          maxLength={2}
          theme={{colors: {primary: this.getBorderColor() || Color.clickableColor}}}
          hasActiveOutline={true}
          onFocus={ () => this.onFocus() }
        />

        <Text style={styles.messageLabel}>{ this.getErrorMessage() }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageLabel: {
    color: Color.errorColor,
    marginBottom: 10,
  },
});

export default NumericInput;
