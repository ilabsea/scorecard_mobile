import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LocalizationContext } from '../Translations';
import NumericInput from '../NumericInput';
import { getIntegerOf } from '../../utils/math';

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
    if (this.state.isValid) { return '' };

    const { translations } = this.context;

    return translations[this.props.fieldName] + ' ' + translations.mustNotBeGreaterThanTotalParticipant;
  };

  setParticipant = (participant) => {
    this.setState({
      participant: participant,
      isValid: getIntegerOf(this.props.dependentParticipant) >= getIntegerOf(participant),
    }, () => {
      this.props.validateForm();
    });
  };

  render() {
    return (
      <NumericInput
        { ...this.props }
        value={ this.state.participant.toString() }
        onChangeText={ (value) => this.setParticipant(value) }
        errorMessage={this.getValidationMsg()}
      />
    );
  }
}

export default DependentValidationInputField;
