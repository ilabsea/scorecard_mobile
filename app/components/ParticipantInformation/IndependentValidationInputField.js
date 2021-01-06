import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { validatePresent } from '../../services/validation_service';
import { LocalizationContext } from '../Translations';
import NumericTextInput from './NumericTextInput';

class IndependentValidtionInputField extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      participant: 0,
      validationMsg: '',
      isValid: true,
    };
  }

  onChangeText = (participant) => {
    const { translations } = this.context;
    const isPresent = validatePresent('participant', participant);
    const validationMsg = !isPresent ? translations['allParticipantRequireMsg'] : '';

    this.setState(
      {
        participant: participant,
        validationMsg: validationMsg,
        isValid: isPresent,
      },
      () => {
        this.props.onParticipantChange();
      },
    );
  };

  render() {
    return (
      <NumericTextInput
        { ...this.props }
        value={ this.state.participant.toString() }
        onChangeText={ (text) => this.onChangeText(text) }
        isValid={ this.state.isValid }
        errorMessage={ this.state.validationMsg }
      />
    );
  }
}

export default IndependentValidtionInputField;
