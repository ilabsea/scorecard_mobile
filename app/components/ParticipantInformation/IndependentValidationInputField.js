import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Color from '../../themes/color';
import {validatePresent} from '../../services/validation_service';
import {LocalizationContext} from '../Translations';

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
    const {translations} = this.context;
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

  getBorderColor = () => {
    return !this.state.isValid ? 'red' : '';
  };

  onFocusTextInput = () => {
    if (this.state.participant === 0 || this.state.participant === '0')
      this.setState({participant: ''});
  }

  render() {
    const {label, placeholder} = this.props;
    const inputLabel = label + ' *';
    return (
      <View>
        <TextInput
          label={inputLabel}
          placeholder={placeholder}
          mode="outlined"
          clearButtonMode="while-editing"
          value={this.state.participant.toString()}
          onChangeText={(text) => this.onChangeText(text)}
          style={{backgroundColor: 'white', width: '100%'}}
          keyboardType="number-pad"
          maxLength={2}
          theme={{colors: {primary: this.getBorderColor() || Color.clickableColor}}}
          onFocus={() => this.onFocusTextInput()}
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
