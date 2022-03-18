import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import SettingSelectPickers from './SettingSelectPickers';

import { environment } from '../../config/environment';

class SettingForm extends Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    this.state = {
      backendUrl: 'https://isaf.digital-csc.org',
      email: '',
      password: '',
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      showPasswordIcon: 'eye',
    };

    this.langugageController;

    this.pickersRef = React.createRef();
  }

  componentDidMount = async () => {
    const value = JSON.parse(await AsyncStorage.getItem('SETTING'));

    if (value !== null) {
      this.setState({
        backendUrl: value.backendUrl,
        email: value.email,
        password: value.password,
      }, () => this.props.updateValidationStatus());
    }

    // try {
    //   const value = await AsyncStorage.getItem('SETTING');

    //   if (value !== null) {
    //     setting = Object.assign(setting, JSON.parse(value))
    //   }
    //   // setting.locale = appLanguage;

    //   console.log('setting ==  ', setting);

    //   this.setState(setting, () => this.props.updateValidationStatus());
    // } catch (error) {

    //   console.log('error =====')
    //   this.setState(setting);
    // }
  }

  closeDropDown = () => {
    this.pickersRef.current?.closeDropdownPickers();
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

  _renderForm = () => {
    const {translations} = this.context;
    const {backendUrl, email, password, backendUrlErrorMsg, emailErrorMsg, passwordErrorMsg} = this.state;
    const backendUrlLabel = `${translations['serverUrl']} *`;
    const emailLabel = `${translations['email']} *`;
    const passwordLabel = `${translations['password']} *`;
    const removeScorecardValue = `${environment.removeScorecardDay} ${translations.days}`;

    return (
      <View>
        <TextFieldInput
          value={backendUrl}
          label={backendUrlLabel}
          placeholder={translations["enterServerUrl"]}
          fieldName="backendUrl"
          onChangeText={this.onChangeText}
          message={translations[backendUrlErrorMsg]}
          onFocus={() => this.closeDropDown()}
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
        <SettingSelectPickers ref={this.pickersRef} formRef={this.props.formRef} formModalRef={this.props.formModalRef} />
      </View>
    )
  }
}

export default SettingForm;