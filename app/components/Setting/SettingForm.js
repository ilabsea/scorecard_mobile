import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../Translations';
import SettingSelectPickers from './SettingSelectPickers';
import SettingUrlEndpointPicker from './SettingUrlEndpointPicker';
import SettingFormInputs from './SettingFormInputs';

class SettingForm extends Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    this.state = {
      backendUrl: props.backendUrl,
      email: '',
      password: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
    };

    this.langugageController;
  }

  componentDidMount = async () => {
    const value = JSON.parse(await AsyncStorage.getItem('SETTING'));
    if (value !== null && !!value.email) {
      this.setState({
        email: value.email,
        password: value.password,
      }, () => this.props.updateValidationStatus());
    }
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = '';
    this.setState(state, () => this.props.updateValidationStatus());
  }

  renderUrlEndpointPicker = () => {
    return (
      <SettingUrlEndpointPicker
        backendUrl={this.state.backendUrl}
        updateBackendUrl={(backendUrl) => this.setState({ backendUrl })}
        formRef={this.props.formRef}
        formModalRef={this.props.formModalRef}
      />
    )
  }

  renderFormInputs() {
    return <SettingFormInputs
             email={this.state.email}
             password={this.state.password}
             emailErrorMsg={this.state.emailErrorMsg}
             passwordErrorMsg={this.state.passwordErrorMsg}
             onChangeText={this.onChangeText}
           />
  }

  render() {
    return (
      <View>
        {this.renderUrlEndpointPicker()}
        { this.renderFormInputs() }
        <SettingSelectPickers formRef={this.props.formRef}
          formModalRef={this.props.formModalRef}
          proposedIndicatorMethod={this.props.proposedIndicatorMethod}
          email={this.state.email}
        />
      </View>
    )
  }
}

export default SettingForm;
