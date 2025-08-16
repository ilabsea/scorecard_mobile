import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Color from '../../themes/color';
import validationService from '../../services/validation_service';
import {LocalizationContext} from '../Translations';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

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

  getBorderColor = () => {
    return !!this.getValidationMsg() ? 'red' : this.props.borderColor ? this.props.borderColor : '';
  };

  onChangeText = (value) => {
    const { translations } = this.context;
    const validationMsg = validationService(this.props.fieldName, value === '' ? undefined : value);

    this.setState({
      validationMsg: translations[validationMsg],
      isValid: !validationMsg,
    }, () => {
      if (this.props.updateValidationStatus != undefined)
        this.props.updateValidationStatus(this.state.isValid);
    });

    this.props.onChangeText(this.props.fieldName, value);
  }

  renderLeftIcon = () => {
    if (this.props.leftIcon)
      return (
        <TextInput.Icon
          name={this.props.leftIcon}
          color="#959595"
          size={this.props.iconSize}
          style={this.props.customIconStyle}
        />
      );

    return null;
  }

  render() {
    const {
      value,
      customStyle,
      customMessageStyle,
    } = this.props;

    return (
      <View>
        <TextInput
          { ...this.props }
          label={this.getLabel()}
          mode="outlined"
          clearButtonMode="while-editing"
          value={value.toString()}
          onChangeText={(text) => this.onChangeText(text)}
          style={[{backgroundColor: Color.whiteColor, width: '100%', fontSize: bodyFontSize()}, customStyle]}
          theme={{colors: {primary: this.getBorderColor() || Color.clickableColor}}}
          left={this.renderLeftIcon()}
          autoCompleteType='off'
          autoCapitalize='none'
        />

        { !this.props.hideMessage &&
          <Text style={[styles.messageLabel, customMessageStyle]}>
            {this.getValidationMsg()}
          </Text>
        }
      </View>
    );
  }
}

TextFieldInput.defaultProps = {
  leftIcon: '',
};

const styles = StyleSheet.create({
  messageLabel: {
    color: Color.errorColor,
    marginBottom: 10,
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.body
  }
});

export default TextFieldInput;
