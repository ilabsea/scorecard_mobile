import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Color from '../themes/color';
import validationService from '../services/validation_service';
import {LocalizationContext} from './Translations';

class TextFieldInput extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      validationMsg: '',
    };
  }

  getValidationMsg = () => {
    const {message} = this.props;
    const {validationMsg} = this.state;

    if (message != '' && message != null) return message;

    return validationMsg;
  };

  getLabel = () => {
    const {label, isRequire} = this.props;
    if (isRequire)
      return label + ' *';

    return label;
  }

  onChangeText = (value) => {
    const { translations } = this.context;
    const validationMsg = validationService(this.props.fieldName, value === '' ? undefined : value);

    this.setState({
      validationMsg: translations[validationMsg],
      isValid: validationMsg === null,
    }, () => {
      if (this.props.updateValidationStatus != undefined)
        this.props.updateValidationStatus(this.state.isValid);
    });

    this.props.onChangeText(this.props.fieldName, value);
  }

  render() {
    const {
      value,
      isSecureEntry,
      borderColor,
    } = this.props;

    return (
      <View>
        <TextInput
          { ...this.props }
          label={this.getLabel()}
          mode="outlined"
          clearButtonMode="while-editing"
          secureTextEntry={isSecureEntry}
          value={value.toString()}
          onChangeText={(text) => this.onChangeText(text)}
          style={{backgroundColor: 'white', width: '100%'}}
          theme={{colors: {primary: borderColor || 'blue'}}}
        />

        <Text style={styles.messageLabel}>{this.getValidationMsg()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageLabel: {
    color: Color.errorColor,
    marginBottom: 10
  }
});

export default TextFieldInput;
