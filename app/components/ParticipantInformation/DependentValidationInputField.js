import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LocalizationContext } from '../Translations';
import NumericTextInput from './NumericTextInput';

class DependentValidationInputField extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      participant: 0,
      isValid: true,
    };
  }

  getValidationMsg = () => {
    const { translations } = this.context;

    if (this.state.isValid) { return '' };

    return translations[this.props.fieldName] + ' ' + translations.mustNotBeGreaterThanTotalParticipant;
  };

  getIntegerOf = (value) => {
    return parseInt(value) || 0;
  };

  onChangeText = (participant) => {
    this.setState({
      participant: participant,
      isValid: this.getIntegerOf(this.props.dependentParticipant) >= this.getIntegerOf(participant),
    }, () => {
      this.props.validateForm();
    });
  };

  render() {
    return (
      <NumericTextInput
        { ...this.props }
        value={ this.state.participant.toString() }
        onChangeText={ (text) => this.onChangeText(text) }
        isValid={this.state.isValid}
        errorMessage={this.getValidationMsg()}
      />
    );
  }
}

export default DependentValidationInputField;
