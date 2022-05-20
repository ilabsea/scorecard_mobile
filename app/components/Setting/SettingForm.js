import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../Translations';
import SettingSelectPickers from './SettingSelectPickers';
import SettingUrlEndpointPicker from './SettingUrlEndpointPicker';
import SettingFormInputs from './SettingFormInputs';

import settingHelper from '../../helpers/setting_helper';

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
    const tempSettingData = await settingHelper.getTempSettingData();

    console.log('temp setting data = ', tempSettingData);

    const settingData = !!tempSettingData ? tempSettingData : JSON.parse(await AsyncStorage.getItem('SETTING'));

    if (settingData !== null && !!settingData.email) {
      this.setState({
        email: settingData.email,
        password: settingData.password,
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
        savedEndpoint={this.props.backendUrl}
        saveTempSettingData={() => this.saveTempSettingData()}
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

  saveTempSettingData() {
    setTimeout(() => {
      const { backendUrl, email, password } = this.state;
      settingHelper.saveTempSettingData(backendUrl, email, password);
    }, 100);
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
          saveTempSettingData={() => this.saveTempSettingData()}
        />
      </View>
    )
  }
}

export default SettingForm;
