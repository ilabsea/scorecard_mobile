import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Color from '../themes/color';
import { getIntegerOf } from '../utils/math';
import { bodyFontSize } from '../utils/font_size_util';
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

  onBlur = () => {
    if (!this.props.value)
      this.props.onChangeText(0);
  }

  getErrorMessage() {
    const { translations } = this.context;

    if (this.props.isRequired) {
      const errorMessage = !!this.props.requiredMessage ? this.props.requiredMessage :  translations.cannotBeBlank;
      return !this.props.value ? errorMessage : '';
    }

    return this.props.errorMessage;
  }

  render() {
    return (
      <View>
        <TextInput
          { ...this.props }
          mode="outlined"
          style={{backgroundColor: Color.whiteColor, width: '100%', fontSize: bodyFontSize()}}
          keyboardType="number-pad"
          maxLength={2}
          theme={{colors: {primary: this.getBorderColor() || Color.clickableColor}}}
          hasActiveOutline={true}
          onFocus={ () => this.onFocus() }
          onBlur={ () => this.onBlur() }
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
    fontSize: bodyFontSize()
  },
});

export default NumericInput;
