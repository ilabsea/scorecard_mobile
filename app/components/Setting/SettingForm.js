import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import SelectPicker from '../SelectPicker';
import TextFieldInput from '../TextFieldInput';

import {localeDictionary} from '../../constants/locale_constant';
import { environment } from '../../config/environment';

class SettingForm extends Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    this.state = {
      backendUrl: 'https://isaf.digital-csc.org',
      email: '',
      password: '',
      locales: [],
      locale: 'km',
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      showPasswordIcon: 'eye',
    };

    this.langugageController;
  }

  componentDidMount = async () => {
    const { appLanguage } = this.context;
    let setting = {
      locales: this.getLocales(),
      locale: appLanguage,
    };

    try {
      const value = await AsyncStorage.getItem('SETTING');

      if (value !== null) {
        setting = Object.assign(setting, JSON.parse(value))
      }
      setting.locale = appLanguage;

      this.setState(setting);
    } catch (error) {
      this.setState(setting);
    }
  }

  getLocales = () => {
    const {translations} = this.context;
    let locales = translations.getAvailableLanguages();
    return locales.map((locale) => ({label: localeDictionary[locale], value: locale}));
  };

  closeDropDown = () => {
    this.languageController.close()
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = '';

    this.setState(state);
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

  changeLocale = (locale) => {
    const {setAppLanguage} = this.context;
    this.setState({locale: locale.value});
    setAppLanguage(locale.value);
  }

  _renderChooseLanugage = () => {
    const {translations} = this.context;
    const {locales, locale} = this.state;

    return (
      <SelectPicker
        items={locales}
        selectedItem={locale}
        label={translations["language"]}
        placeholder={translations["selectLanguage"]}
        searchablePlaceholder={translations["searchForLanguage"]}
        zIndex={6000}
        showCustomArrow={true}
        onChangeItem={this.changeLocale}
        mustHasDefaultValue={true}
        controller={(instance) => this.languageController = instance}
        onOpen={() => Keyboard.dismiss()}
        customDropDownContainerStyle={{marginTop: -5}}
      />
    );
  };

  render() {
    return (
      <View>
        {this._renderForm()}
        {this._renderChooseLanugage()}
      </View>
    )
  }
}

export default SettingForm;