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
      validationMsg: '',
      participateValidation: {}
    };
  }

  componentDidMount() {
    this.setState({participateValidation: this.props.participateValidation});
  }

  getValidationMsg = () => {
    const {translations} = this.context;
    const {participateValidation} = this.state;
    let message = '';
    if (!participateValidation[this.props.fieldName])
      message = translations[this.props.fieldName] + ' ' + translations['mustNotBeGreaterThanTotalParticipate'];;

    if (message != '' && message != null)
      return message;

    return this.state.validationMsg;
  };

  getIntegerOf = (value) => {
    return parseInt(value) || 0;
  };

  onChangeText = (value) => {
    const {fieldName, independentParticipate, updateStateValue} = this.props;
    let formValidation = this.state.participateValidation;
    let numOfIndependentParticipate = this.getIntegerOf(independentParticipate);
    const dependentParticipate = {};
    dependentParticipate[fieldName] = value;
    updateStateValue(dependentParticipate);

    if (numOfIndependentParticipate < this.getIntegerOf(value)) {
      formValidation[fieldName] = false;
      updateStateValue({isError: true});
    }
    else if (numOfIndependentParticipate >= this.getIntegerOf(value)) {
      formValidation[fieldName] = true;
      updateStateValue({isError: numOfIndependentParticipate == 0 ? true : false});
    }
    this.setState({participateValidation: formValidation});
  };

  getBorderColor = () => {
    const {participateValidation} = this.state;
    if (!participateValidation[this.props.fieldName])
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
