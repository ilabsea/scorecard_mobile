import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Color from '../../themes/color';
import validationService from '../../services/validation_service';
import {LocalizationContext} from '../Translations';

class IndependentValidtionInputField extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      validationMsg: '',
      isValid: true,
    };
  }

  validateOnBlur = (value) => {
    this.setState({validationMsg: ''});
    const allParticipate = value != null ? value : this.props.value
    const validation = this.getValidation(allParticipate);
    this.updateValidationState(validation);
  };

  getValidation = (allParticipate) => {
    const {translations} = this.context;
    const validationMsg = validationService('allParticipate', allParticipate);
    return {
      message: validationMsg != null ? translations['allParticipateRequireMsg'] : '',
      isValid: validationMsg != null ? false : true,
    };
  }

  updateValidationState = (validation) => {
    this.setState({
      validationMsg: validation.message,
      isValid: validation.isValid,
    });
  }

  onChangeText = (value) => {
    const {updateStateValue} = this.props;
    const validation = this.getValidation(value);
    this.updateValidationState(validation);
    updateStateValue({
      allParticipate: value,
      isError: !validation.isValid,
    });

    this.validateDependentParticipate(value);
  };

  getIntegerOf = (value) => {
    return parseInt(value) || 0;
  };

  validateDependentParticipate = (allParticipate) => {
    const {dependentParticipate, participateValidation, updateStateValue} = this.props;
    let validation = participateValidation;
    let isInvalidDepedentParticipate = false;
    const participateTypes = Object.keys(dependentParticipate);
    for (let i = 0; i < participateTypes.length; i++) {
      const numOfDependentParticipate = this.getIntegerOf(dependentParticipate[participateTypes[i]]);
      if (this.getIntegerOf(allParticipate) < numOfDependentParticipate) {
        validation[participateTypes[i]] = false;
        isInvalidDepedentParticipate = true;
      }
      else
        validation[participateTypes[i]] = true;
    }

    updateStateValue({
      participateValidation: validation,
      isError: isInvalidDepedentParticipate,
    });
  }

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
          onBlur={() => this.validateOnBlur(null)}
          keyboardType="number-pad"
          maxLength={2}
          theme={{colors: {primary: this.getBorderColor() || 'blue'}}}
        />
        <Text style={styles.messageLabel}>{this.state.validationMsg}</Text>
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

export default IndependentValidtionInputField;