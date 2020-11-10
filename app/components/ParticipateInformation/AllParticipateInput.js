import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Color from '../../themes/color';
import validationService from '../../services/validation_service';
import {LocalizationContext} from '../Translations';

class AllParticipateInput extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      validationMsg: '',
      isValid: true,
    };
  }

  validateInput = () => {
    this.setState({validationMsg: ''});
    const {translations} = this.context;
    const validationMsg = validationService('allParticipate', this.props.value);
    this.setState({
      validationMsg: translations[validationMsg],
      isValid: validationMsg != null ? false : true,
    });
  };

  getValidationMsg = () => {
    const {translations} = this.context;
    let message = '';
    if (!this.state.isValid)
      message = translations['allParticipate'] + ' ' + translations['mustNotBeLessThanOtherParticipateType'];

    if (message != '' && message != null)
      return message;

    return this.state.validationMsg;
  };

  getIntegerOf = (value) => {
    return parseInt(value) || 0;
  };

  onChangeText = (value) => {
    const {otherParticipate, updateStateValue, participateValidation} = this.props;
    let formValidation = participateValidation;
    let numOfAllParticipate = this.getIntegerOf(value);
    updateStateValue({allParticipate: value});

    const participateTypes = Object.keys(otherParticipate);
    for (let i = 0; i < participateTypes.length; i++) {
      const numOfOtherParticipate = this.getIntegerOf(otherParticipate[participateTypes[i]]);
      if (numOfAllParticipate < numOfOtherParticipate) {
        this.setState({isValid: false});
        updateStateValue({isError: true});
        break;
      }
      else {
        formValidation[participateTypes[i]] = true;
        this.setState({isValid: true});
        updateStateValue({
          isError: false,
          participateValidation: formValidation,
        });
      }
    }
  };

  getBorderColor = () => {
    return !this.state.isValid ? 'red' : '';
  };

  render() {
    const {value, label, placeholder} = this.props;
    const inputLabel = label + ' *';
    return (
      <View>
        <TextInput
          label={inputLabel}
          placeholder={placeholder}
          mode="outlined"
          clearButtonMode="while-editing"
          value={value.toString()}
          onChangeText={(text) => this.onChangeText(text)}
          style={{backgroundColor: 'white', width: '100%'}}
          onBlur={() => this.validateInput()}
          keyboardType="number-pad"
          maxLength={2}
          theme={{colors: {primary: this.getBorderColor() || 'blue'}}}
        />
        <Text style={styles.messageLabel}>{this.getValidationMsg()}</Text>
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

export default AllParticipateInput;
