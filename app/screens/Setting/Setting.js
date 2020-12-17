import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from 'react-native-whc-loading';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import MessageLabel from '../../components/MessageLabel';
import TextFieldInput from '../../components/TextFieldInput';
import SelectPicker from '../../components/SelectPicker';

import Color from '../../themes/color';
import validationService from '../../services/validation_service';
import {checkConnection} from '../../services/api_service';
import {handleApiResponse} from '../../services/api_service';
import {localeDictionary} from '../../constants/locale_constant';

import SessionApi from '../../api/SessionApi';

class Setting extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      backendUrl: 'https://isaf-stg.ilabsea.org',
      email: '',
      password: '',
      locales: [],
      locale: 'km',
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      errorMsg: '',
      messageType: '',
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    const { appLanguage } = this.context;
    let setting = { locales: this.getLocales(), locale: appLanguage };

    try {
      const value = await AsyncStorage.getItem('SETTING');

      if (value !== null) {
        setting = Object.assign(setting, JSON.parse(value))
      }

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

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = '';

    this.setState(state);
  }

  renderInputForm = () => {
    const {translations} = this.context;
    const {backendUrl, email, password, backendUrlErrorMsg, emailErrorMsg, passwordErrorMsg} = this.state;

    return (
      <View>
        <TextFieldInput
          value={backendUrl}
          label={translations["backendUrl"]}
          placeholder={translations["enterBackendUrl"]}
          fieldName="backendUrl"
          onChangeText={this.onChangeText}
          message={translations[backendUrlErrorMsg]}
          isSecureEntry={false}
        />

        <TextFieldInput
          value={email}
          label={translations["email"]}
          placeholder={translations["enterEmail"]}
          fieldName="email"
          onChangeText={this.onChangeText}
          message={translations[emailErrorMsg]}
          isSecureEntry={false}
        />

        <TextFieldInput
          value={password}
          label={translations["password"]}
          placeholder={translations["enterPassword"]}
          fieldName="password"
          onChangeText={this.onChangeText}
          message={translations[passwordErrorMsg]}
          isSecureEntry={true}
        />
      </View>
    );
  };

  getPickerDefaultValue = (value) => {
    if (value != '' && value != undefined)
      return value.toString();

    return null;
  };

  changeLocale = (locale) => {
    const {setAppLanguage} = this.context;
    this.setState({locale: locale.value});
    setAppLanguage(locale.value);
  }

  renderChooseLanugage = () => {
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
        customLabelStyle={{zIndex: 6001}}
        showCustomArrow={false}
        onChangeItem={this.changeLocale}
        mustHasDefaultValue={true}
      />
    );
  };

  isValidForm = () => {
    const {backendUrl, email, password} = this.state;
    this.setState({
      errorMsg: '',
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
    });

    const backendUrlValidationMsg = validationService('backendUrl', backendUrl);
    const emailValidationMsg = validationService('email', email);
    const passwordValidationMsg = validationService('password', password);

    this.setState({
      backendUrlErrorMsg: backendUrlValidationMsg || '',
      emailErrorMsg: emailValidationMsg || '',
      passwordErrorMsg: passwordValidationMsg || '',
    });

    if (backendUrlValidationMsg != null || emailValidationMsg != null || passwordValidationMsg != null)
      return false;

    return true;
  }

  async authenticate() {
    const { backendUrl, email, password } = this.state;
    const response = await SessionApi.authenticate(email, password);
    handleApiResponse(response, (responseData) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      this.refs.loading.show(false);
      this.setState({isLoading: false});
      AsyncStorage.setItem('AUTH_TOKEN', responseData.authentication_token);
      AsyncStorage.setItem('SETTING', JSON.stringify({backendUrl: backendUrl, email: email, password: password}));
      this.props.navigation.goBack();
    }, () => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      this.refs.loading.show(false);
      this.setState({isLoading: false});
      this.handleAuthenticateError(response);
    });
  }

  save = async () => {
    if (!this.isValidForm()) {
      return;
    }

    AsyncStorage.setItem('ENDPOINT_URL', this.state.backendUrl);
    AsyncStorage.setItem('IS_CONNECTED', 'false');

    this.refs.loading.show();
    this.setState({isLoading: true});
    this.authenticate();

    checkConnection((type, message) => {
      const { translations } = this.context;

      this.setState({
        messageType: type,
        errorMsg: translations[message],
        isLoading: false,
      });

      this.refs.loading.show(false);
    });
  }

  handleAuthenticateError = (response) => {
    let message = '';
    if (response.error === undefined) {
      this.setState({errorMsg: 'authenticationFailed'});
      return;
    }

    const error = response.error;

    if (error.toLowerCase() === 'invalid email or password!')
      message = 'invalidEmailOrPasswordMsg';
    else if (error.toLowerCase() === 'Your account is unprocessable')
      message = 'accountIsUnprocessable';
    else
      message = 'authenticationFailed';

    this.setState({errorMsg: message});
  }

  renderErrorMsg = () => {
    const {translations} = this.context;
    const {errorMsg, messageType} = this.state;

    return (
      <MessageLabel
        message={translations[errorMsg]}
        type={messageType}
        customStyle={{marginTop: 120}}
      />
    );
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container]}>
          <Loading
            ref="loading"
            backgroundColor='#ffffffF2'
            borderRadius={5}
            size={70}
            imageSize={40}
            indicatorColor={Color.primaryColor}
          />
          {this.renderInputForm()}
          {this.renderChooseLanugage()}
          {this.renderErrorMsg()}
          <ActionButton
            label={translations['save']}
            onPress={() => this.save()}
            isDisabled={this.state.isLoading}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
  },
  inputLabel: {
    marginBottom: 10,
  },
  dropDownPickerStyle: {
    backgroundColor: 'white',
    zIndex: 5000,
    elevation: 2,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  }
});

export default Setting;