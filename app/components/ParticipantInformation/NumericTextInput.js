import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Color from '../../themes/color';

class NumbericTextInput extends Component {
  getBorderColor = () => {
    return !this.props.isValid ? 'red' : '';
  };

  onFocus = () => {
    if (this.props.value < 1) {
      this.props.onChangeText('');
    }
  }

  render() {
    return (
      <View>
        <TextInput
          mode="outlined"
          style={{backgroundColor: 'white', width: '100%'}}
          keyboardType="number-pad"
          maxLength={2}
          theme={{colors: {primary: this.getBorderColor() || Color.clickableColor}}}
          onFocus={ () => this.onFocus() }
          hasActiveOutline={true}
          { ...this.props }
        />

        <Text style={styles.messageLabel}>{this.props.errorMessage}</Text>
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

export default NumbericTextInput;
