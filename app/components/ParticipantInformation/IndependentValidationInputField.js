import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { validatePresent } from '../../services/validation_service';
import { LocalizationContext } from '../Translations';
import NumericInput from '../NumericInput';

class IndependentValidtionInputField extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      participant: 0,
      isValid: true
    };
  }

  setParticipant = (participant) => {
    const { translations } = this.context;

    this.setState( {
      participant: participant,
      isValid: !!participant && participant > 0
    }, () => {
      this.props.onParticipantChange();
    });
  };

  render() {
    return (
      <NumericInput
        { ...this.props }
        value={ this.state.participant.toString() }
        onChangeText={ (value) => this.setParticipant(value) }
        isRequired={true}
      />
    );
  }
}

export default IndependentValidtionInputField;
