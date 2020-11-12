import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';

class DependentValidationInputField extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
    };
  }

  getValidationMsg = () => {
    const {translations} = this.context;
    let message = '';
    if (!this.state.isValid)
      message = translations[this.props.fieldName] + ' ' + translations['mustNotBeGreaterThanTotalParticipant'];

    return message;
  };

  getIntegerOf = (value) => {
    return parseInt(value) || 0;
  };

  onChangeText = (participant) => {
    const {dependentParticipant, fieldName, updateStateValue} = this.props;
    let isValid = true;
    if (this.getIntegerOf(dependentParticipant) < this.getIntegerOf(participant))
      isValid = false;

    this.setState({isValid}, () => {
      const parentState = {};
      parentState[fieldName] = participant;
      updateStateValue(parentState);
    });
  };

  getBorderColor = () => {
    if (!this.state.isValid)
      return 'red';

    return '';
  };

  render() {
    const {value, label, placeholder} = this.props;
    return (
      <View>
        <TextInput
          label={label}
          placeholder={placeholder}
          mode="outlined"
          clearButtonMode="while-editing"
          value={value.toString()}
          onChangeText={(text) => this.onChangeText(text)}
          style={{backgroundColor: 'white', width: '100%'}}
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

export default DependentValidationInputField;