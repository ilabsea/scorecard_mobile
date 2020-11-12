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

  getValidation = (participant) => {
    const {translations} = this.context;
    const validationMsg = validationService('participant', participant);
    return {
      message: validationMsg != null ? translations['allParticipantRequireMsg'] : '',
      isValid: validationMsg != null ? false : true,
    };
  }

  onChangeText = (participant) => {
    const validation = this.getValidation(participant);
    this.setState({
      validationMsg: validation.message,
      isValid: validation.isValid,
    }, () => {
      this.props.onParticipantChange(participant);
    });
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