import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Color from '../../themes/color';
import validationService from '../../services/validation_service';
import {LocalizationContext} from '../Translations';

class OtherParticipateInput extends Component {
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

  validateInput = () => {
    this.setState({validationMsg: ''});
    const {translations} = this.context;
    const {fieldName, value, renderName} = this.props;
    const validationMsg = validationService(fieldName, value, renderName);
    this.setState({validationMsg: translations[validationMsg]});
  };

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
    const {fieldName, allParticipate, updateStateValue} = this.props;
    let formValidation = this.state.participateValidation;
    let numOfAllParticipate = this.getIntegerOf(allParticipate);
    const newParticipate = {};
    newParticipate[fieldName] = value;
    updateStateValue(newParticipate);

    if (numOfAllParticipate < this.getIntegerOf(value)) {
      formValidation[fieldName] = false;
      this.setState({participateValidation: formValidation});
      updateStateValue({isError: true});
    }
    else {
      formValidation[fieldName] = true;
      this.setState({participateValidation: formValidation});
      updateStateValue({isError: parseInt(allParticipate) == 0 ? true : false});
    }
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

export default OtherParticipateInput;
