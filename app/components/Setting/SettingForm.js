import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import SettingSelectPickers from './SettingSelectPickers';
import SettingUrlEndpointPicker from './SettingUrlEndpointPicker';

import { environment } from '../../config/environment';

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
      showPasswordIcon: 'eye',
      openPickerId: null
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

  closeDropDown = () => {
    this.setState({ openPickerId: null })
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = '';
    this.setState(state, () => this.props.updateValidationStatus());
  }

  _renderShowPasswordIcon = () => {
    return (
      <TextInput.Icon
        name={this.state.showPasswordIcon}
        color="#959595"
        onPress={() => this.setState({ showPasswordIcon: this.state.showPasswordIcon == 'eye' ? 'eye-off' : 'eye' })}
      />
    )
  }

  setOpenPickerId = (openId) => {
    this.setState({ openPickerId: openId });
  }

  _renderForm = () => {
    const {translations} = this.context;
    const {backendUrl, email, password, emailErrorMsg, passwordErrorMsg} = this.state;
    const emailLabel = `${translations['email']} *`;
    const passwordLabel = `${translations['password']} *`;
    const removeScorecardValue = `${environment.removeScorecardDay} ${translations.days}`;

    return (
      <View>
        <SettingUrlEndpointPicker openPickerId={this.state.openPickerId} setOpenPickerId={this.setOpenPickerId}
          backendUrl={backendUrl}
          updateBackendUrl={(backendUrl) => this.setState({ backendUrl })}
        />

        <TextFieldInput
          value={email}
          label={emailLabel}
          placeholder={translations["enterEmail"]}
          fieldName="email"
          onChangeText={this.onChangeText}
          message={translations[emailErrorMsg]}
          onFocus={() => this.closeDropDown()}
          keyboardType='email-address'
          caretHidden={false}
        />

        <TextFieldInput
          value={password}
          label={passwordLabel}
          placeholder={translations["enterPassword"]}
          fieldName="password"
          onChangeText={this.onChangeText}
          message={translations[passwordErrorMsg]}
          secureTextEntry={this.state.showPasswordIcon == 'eye' ? true : false}
          onFocus={() => this.closeDropDown()}
          right={this._renderShowPasswordIcon()}
        />

        <TextFieldInput
          value={removeScorecardValue}
          label={translations.submittedScorecardWillBeRemovedIn}
          fieldName="removeScorecardDuration"
          onChangeText={this.onChangeText}
          disabled={true}
        />
      </View>
    )
  }

  render() {
    return (
      <View>
        {this._renderForm()}
        <SettingSelectPickers formRef={this.props.formRef}
          formModalRef={this.props.formModalRef}
          proposedIndicatorMethod={this.props.proposedIndicatorMethod}
          openPickerId={this.state.openPickerId}
          setOpenPickerId={this.setOpenPickerId}
          email={this.state.email}
        />
      </View>
    )
  }
}

export default SettingForm;