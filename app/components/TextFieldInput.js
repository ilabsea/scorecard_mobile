import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Color from '../themes/color';
import validationService from '../services/validation_service';
import {LocalizationContext} from '../components/Translations';

class TextFieldInput extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      validationMsg: '',
    };
  }

  renderIcon = () => {
    return (
      <TextInput.Icon
        color="#8C8C8C"
        icon="email"
        size={30}
        style={{width: 100}}
      />
    );
  };

  validateInput = () => {
    const {translations} = this.context;
    this.setState({validationMsg: ''});
    const {fieldName, value, renderName} = this.props;
    const validationMsg = validationService(fieldName, value, renderName);
    this.setState({
      validationMsg: translations[validationMsg],
    });
  };

  getValidationMsg = () => {
    const {message} = this.props;
    const {validationMsg} = this.state;

    if (message != '' && message != null) return message;

    return validationMsg;
  };

  render() {
    const {
      value,
      label,
      placeholder,
      fieldName,
      onChangeText,
      isSecureEntry,
    } = this.props;

    return (
      <View>
        <TextInput
          label={label}
          placeholder={placeholder}
          mode="outlined"
          // left={this.renderIcon()}
          clearButtonMode="while-editing"
          secureTextEntry={isSecureEntry}
          value={value}
          onChangeText={(text) => onChangeText(fieldName, text)}
          style={{backgroundColor: 'white', width: '100%'}}
          onBlur={() => this.validateInput()}
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